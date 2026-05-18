<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdoptionResource;
use App\Models\Adoption;
use App\Models\Animal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdoptionController extends Controller
{
    public function index()
    {
        $adoptions = Auth::user()
            ->adoptions()
            ->with('animal')
            ->latest()
            ->get();

        return AdoptionResource::collection($adoptions);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'animal_id' => 'required|exists:animals,id',
            'motivation' => 'nullable|string',
        ]);

        $animal = Animal::findOrFail($validated['animal_id']);

        if ($animal->status !== 'available') {
            return response()->json([
                'message' => 'Cet animal n\'est pas disponible à l\'adoption.',
                'errors' => [
                    'animal_id' => ['Cet animal n\'est pas disponible à l\'adoption.'],
                ],
            ], 422);
        }

        $hasPending = Adoption::query()
            ->where('user_id', Auth::id())
            ->where('animal_id', $animal->id)
            ->where('status', 'pending')
            ->exists();

        if ($hasPending) {
            return response()->json([
                'message' => 'Vous avez déjà une demande en cours pour cet animal.',
                'errors' => [
                    'animal_id' => ['Vous avez déjà une demande en cours pour cet animal.'],
                ],
            ], 422);
        }

        $adoption = Adoption::create([
            'user_id' => Auth::id(),
            'animal_id' => $animal->id,
            'requested_at' => now(),
            'status' => 'pending',
            'motivation' => $validated['motivation'] ?? null,
        ]);

        return (new AdoptionResource($adoption->load('animal')))
            ->response()
            ->setStatusCode(201);
    }
}
