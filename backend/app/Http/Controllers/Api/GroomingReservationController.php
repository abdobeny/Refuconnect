<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GroomingReservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroomingReservationController extends Controller
{
    public function myReservations()
    {
        $reservations = Auth::user()->groomingReservations()->latest()->get();
        return response()->json($reservations);
    }

    public function store(Request $request)
    {
        $request->validate([
            'animal_name' => 'required|string|max:255',
            'service_type' => 'required|in:bain,tonte,nettoyage,bain_tonte,autre',
            'reservation_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $reservation = GroomingReservation::create([
            'user_id' => Auth::id(),
            'animal_name' => $request->animal_name,
            'service_type' => $request->service_type,
            'reservation_date' => $request->reservation_date,
            'status' => 'en_attente',
            'notes' => $request->notes,
        ]);

        return response()->json($reservation, 201);
    }
}
