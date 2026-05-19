<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DonationResource;
use App\Models\Donation;
use App\Services\PayPalService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

class DonationController extends Controller
{
    public function index()
    {
        $donations = Auth::user()->donations()->latest()->get();

        return DonationResource::collection($donations);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:financial,food,material',
            'amount' => 'required_if:type,financial|nullable|numeric|min:1',
            'item_description' => 'required_if:type,food,material|nullable|string',
            'message' => 'nullable|string',
        ]);

        $donation = Donation::create([
            'user_id' => Auth::id(),
            'type' => $validated['type'],
            'amount' => $validated['type'] === 'financial' ? $validated['amount'] : null,
            'item_description' => $validated['type'] !== 'financial' ? $validated['item_description'] : null,
            'status' => 'pending',
            'donation_date' => now(),
            'message' => $validated['message'] ?? null,
        ]);

        return (new DonationResource($donation))
            ->response()
            ->setStatusCode(201);
    }

    public function createPaypalOrder(Request $request, PayPalService $paypal)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'message' => 'nullable|string',
        ]);

        $donation = Donation::create([
            'user_id' => Auth::id(),
            'type' => 'financial',
            'amount' => $validated['amount'],
            'payment_method' => 'paypal',
            'status' => 'pending',
            'donation_date' => now(),
            'message' => $validated['message'] ?? null,
        ]);

        try {
            $order = $paypal->createOrder($donation);
        } catch (\Throwable $exception) {
            $donation->update([
                'status' => 'failed',
                'admin_notes' => $exception->getMessage(),
            ]);

            return response()->json([
                'message' => $exception->getMessage(),
            ], 422);
        }

        $donation->update([
            'paypal_order_id' => $order['id'] ?? null,
        ]);

        $approvalUrl = collect($order['links'] ?? [])
            ->firstWhere('rel', 'approve')['href'] ?? null;

        if (! $approvalUrl) {
            $donation->update([
                'status' => 'failed',
                'admin_notes' => 'PayPal approval URL missing.',
            ]);

            return response()->json([
                'message' => 'PayPal n’a pas retourné de lien de paiement.',
            ], 422);
        }

        return response()->json([
            'donation' => new DonationResource($donation->refresh()),
            'paypal_order_id' => $donation->paypal_order_id,
            'approval_url' => $approvalUrl,
        ], 201);
    }

    public function capturePaypalOrder(Donation $donation, PayPalService $paypal)
    {
        if ($donation->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($donation->status === 'completed') {
            return new DonationResource($donation);
        }

        if ($donation->payment_method !== 'paypal' || ! $donation->paypal_order_id) {
            return response()->json([
                'message' => 'Cette donation n’a pas de commande PayPal à confirmer.',
            ], 422);
        }

        try {
            $capture = $paypal->captureOrder($donation->paypal_order_id);
        } catch (\Throwable $exception) {
            $donation->update([
                'status' => 'failed',
                'admin_notes' => $exception->getMessage(),
            ]);

            return response()->json([
                'message' => $exception->getMessage(),
            ], 422);
        }

        if (($capture['status'] ?? null) !== 'COMPLETED') {
            $donation->update([
                'status' => 'failed',
                'admin_notes' => 'PayPal status: ' . ($capture['status'] ?? 'unknown'),
            ]);

            return response()->json([
                'message' => 'Le paiement PayPal n’a pas été confirmé.',
            ], 422);
        }

        $payment = Arr::get($capture, 'purchase_units.0.payments.captures.0', []);
        $donation->update([
            'status' => 'completed',
            'paypal_capture_id' => $payment['id'] ?? null,
            'paypal_payer_id' => Arr::get($capture, 'payer.payer_id'),
            'payment_completed_at' => now(),
        ]);

        return new DonationResource($donation->refresh());
    }
}
