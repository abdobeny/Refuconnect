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

    public function myTestimonials()
    {
        $testimonials = Testimonial::query()
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get(['id', 'name', 'role', 'quote', 'detail', 'status', 'rejection_reason', 'featured', 'created_at']);

        return response()->json([
            'data' => $testimonials,
        ]);
    }

    // Admin methods
    public function adminIndex()
    {
        $testimonials = Testimonial::query()
            ->orderBy('status', 'asc')
            ->orderBy('created_at', 'desc')
            ->get(['id', 'user_id', 'name', 'role', 'quote', 'detail', 'status', 'rejection_reason', 'featured', 'created_at']);

        return response()->json([
            'data' => $testimonials,
        ]);
    }

    public function approve(Testimonial $testimonial)
    {
        $testimonial->update([
            'status' => 'approved',
            'rejection_reason' => null,
        ]);

        return response()->json([
            'message' => 'Témoignage approuvé avec succès',
            'data' => $testimonial,
        ]);
    }

    public function reject(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'rejection_reason' => 'required|string|min:10|max:500',
        ]);

        $testimonial->update([
            'status' => 'rejected',
            'rejection_reason' => $validated['rejection_reason'],
        ]);

        return response()->json([
            'message' => 'Témoignage rejeté avec le motif envoyé à l\'utilisateur',
            'data' => $testimonial,
        ]);
    }

    public function feature(Testimonial $testimonial)
    {
        $testimonial->update([
            'featured' => !$testimonial->featured,
        ]);

        return response()->json([
            'message' => $testimonial->featured ? 'Mis en avant sur la page d\'accueil' : 'Retiré de la page d\'accueil',
            'data' => $testimonial,
        ]);
    }
}
