<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CouplingRequestResource;
use App\Models\CouplingRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class CouplingRequestController extends Controller
{
    public function index()
    {
        $requests = Auth::user()
            ->couplingRequests()
            ->latest()
            ->get();

        return CouplingRequestResource::collection($requests);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'contact_phone' => 'required|string|max:30',
            'pet_species' => ['required', Rule::in(['dog', 'cat'])],
            'pet_breed' => 'required|string|max:255',
            'pet_sex' => ['required', Rule::in(['male', 'female'])],
            'pet_age' => 'required|string|max:50',
            'vaccinated' => ['required', Rule::in(['yes', 'no', 'unknown'])],
            'health_status' => 'nullable|string|max:255',
            'preferred_breed' => 'nullable|string|max:255',
            'message' => 'nullable|string',
        ]);

        $couplingRequest = CouplingRequest::create([
            ...$validated,
            'user_id' => Auth::id(),
            'status' => 'pending',
        ]);

        return (new CouplingRequestResource($couplingRequest))
            ->response()
            ->setStatusCode(201);
    }

    public function show(CouplingRequest $couplingRequest)
    {
        if ($couplingRequest->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return new CouplingRequestResource($couplingRequest);
    }
}
