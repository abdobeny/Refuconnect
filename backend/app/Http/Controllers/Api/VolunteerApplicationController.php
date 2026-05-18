<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\VolunteerApplicationResource;
use App\Models\VolunteerApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VolunteerApplicationController extends Controller
{
    public function index()
    {
        $applications = Auth::user()
            ->volunteerApplications()
            ->latest()
            ->get();

        return VolunteerApplicationResource::collection($applications);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'message' => 'nullable|string',
        ]);

        $application = VolunteerApplication::create([
            'user_id' => Auth::id(),
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'message' => $validated['message'] ?? null,
            'status' => 'pending',
        ]);

        return (new VolunteerApplicationResource($application))
            ->response()
            ->setStatusCode(201);
    }
}
