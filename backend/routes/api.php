<?php

use App\Http\Controllers\Api\AdoptionController;
use App\Http\Controllers\Api\AnimalController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CouplingRequestController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\GroomingReservationController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\VolunteerApplicationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Public read + authenticated user actions. Admin management is via Filament.
|
*/

// Public routes
Route::middleware('throttle:10,1')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

Route::get('/animals', [AnimalController::class, 'index']);
Route::get('/animals/{animal}', [AnimalController::class, 'show']);

// Homepage social proof
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/public-stats', function () {
    return response()->json([
        'animals_available' => \App\Models\Animal::where('status', 'available')->count(),
        'adoptions_approved' => \App\Models\Adoption::where('status', 'approved')->count(),
        'donations_count' => \App\Models\Donation::count(),
        'donations_pledged' => (float) \App\Models\Donation::where('type', 'financial')->sum('amount'),
        'donations_confirmed' => (float) \App\Models\Donation::where('type', 'financial')->where('status', 'completed')->sum('amount'),
        'volunteers' => \App\Models\VolunteerApplication::count(),
    ]);
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user', [AuthController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/my-adoptions', [AdoptionController::class, 'index']);
    Route::post('/adoptions', [AdoptionController::class, 'store']);

    Route::get('/my-donations', [DonationController::class, 'index']);
    Route::post('/donations', [DonationController::class, 'store']);
    Route::post('/donations/paypal-orders', [DonationController::class, 'createPaypalOrder']);
    Route::post('/donations/{donation}/capture-paypal', [DonationController::class, 'capturePaypalOrder']);

    Route::get('/my-grooming', [GroomingReservationController::class, 'index']);
    Route::post('/grooming', [GroomingReservationController::class, 'store']);

    Route::post('/testimonials', [TestimonialController::class, 'store']);
    Route::get('/my-coupling-requests', [CouplingRequestController::class, 'index']);
    Route::post('/coupling-requests', [CouplingRequestController::class, 'store']);
    Route::get('/coupling-requests/{couplingRequest}', [CouplingRequestController::class, 'show']);

    Route::get('/my-volunteer-applications', [VolunteerApplicationController::class, 'index']);
    Route::post('/volunteer-applications', [VolunteerApplicationController::class, 'store']);

    Route::get('/stats', function () {
        return response()->json([
            'adoptions' => \App\Models\Adoption::count(),
            'adoptions_pending' => \App\Models\Adoption::where('status', 'pending')->count(),
            'donations' => \App\Models\Donation::count(),
            'grooming' => \App\Models\GroomingReservation::count(),
            'coupling' => \App\Models\CouplingRequest::count(),
            'volunteers' => \App\Models\VolunteerApplication::count(),
            'animals_available' => \App\Models\Animal::where('status', 'available')->count(),
        ]);
    });
});
