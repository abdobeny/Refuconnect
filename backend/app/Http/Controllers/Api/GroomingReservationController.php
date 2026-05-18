<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GroomingResource;
use App\Models\GroomingReservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroomingReservationController extends Controller
{
    public function index()
    {
        $reservations = Auth::user()->groomingReservations()->latest()->get();

        return GroomingResource::collection($reservations);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_type' => 'required|in:bath,haircut,full_grooming,nail_trim,other',
            'reservation_date' => 'required|date|after:now',
            'pet_name' => 'required|string|max:255',
            'pet_type' => 'required|in:dog,cat,other',
            'notes' => 'nullable|string',
        ]);

        $reservation = GroomingReservation::create([
            ...$validated,
            'user_id' => Auth::id(),
            'status' => 'pending',
        ]);

        return (new GroomingResource($reservation))
            ->response()
            ->setStatusCode(201);
    }
}
