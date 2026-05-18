<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::query()
            ->where('status', 'approved')
            ->where('featured', true)
            ->orderBy('sort_order')
            ->latest()
            ->limit(6)
            ->get(['id', 'name', 'role', 'quote', 'detail']);

        return response()->json($testimonials);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'role' => 'required|string|max:80',
            'quote' => 'required|string|min:20|max:500',
            'detail' => 'nullable|string|max:140',
        ]);

        $testimonial = Testimonial::create([
            'user_id' => Auth::id(),
            'name' => Auth::user()->name,
            'role' => $validated['role'],
            'quote' => $validated['quote'],
            'detail' => $validated['detail'] ?? null,
            'status' => 'pending',
            'featured' => false,
        ]);

        return response()->json([
            'message' => 'Votre témoignage a été envoyé et sera publié après validation.',
            'testimonial' => $testimonial,
        ], 201);
    }
}
