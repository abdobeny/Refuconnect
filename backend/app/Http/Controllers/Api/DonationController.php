<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DonationController extends Controller
{
    public function myDonations()
    {
        $donations = Auth::user()->donations()->latest()->get();
        return response()->json($donations);
    }

    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|string',
            'type' => 'required|in:one_time,monthly,in_kind',
            'message' => 'nullable|string',
        ]);

        $donation = Donation::create([
            'user_id' => Auth::id(),
            'amount' => $request->amount,
            'payment_method' => $request->payment_method,
            'type' => $request->type,
            'status' => 'pending',
            'donation_date' => now(),
            'message' => $request->message,
        ]);

        return response()->json($donation, 201);
    }
}
