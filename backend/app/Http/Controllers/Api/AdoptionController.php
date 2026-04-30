<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Adoption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdoptionController extends Controller
{
    public function myAdoptions()
    {
        $adoptions = Auth::user()->adoptions()->with('animal')->latest()->get();
        return response()->json($adoptions);
    }

    public function store(Request $request)
    {
        $request->validate([
            'animal_id' => 'required|exists:animals,id',
            'motivation' => 'nullable|string',
        ]);

        $adoption = Adoption::create([
            'user_id' => Auth::id(),
            'animal_id' => $request->animal_id,
            'date_demande' => now(),
            'statut' => 'en_attente',
            'motivation' => $request->motivation,
        ]);

        return response()->json($adoption, 201);
    }
}
