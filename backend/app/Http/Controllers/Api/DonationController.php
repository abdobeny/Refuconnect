<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DonationResource;
use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}
