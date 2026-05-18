<?php

use App\Http\Controllers\Api\AdoptionController;
use App\Http\Controllers\Api\AnimalController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CouplingRequestController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\GroomingReservationController;
use App\Http\Controllers\Api\TestimonialController;
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
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/animals', [AnimalController::class, 'index']);
Route::get('/animals/{animal}', [AnimalController::class, 'show']);

// Homepage social proof
Route::get('/testimonials', [TestimonialController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/my-adoptions', [AdoptionController::class, 'index']);
    Route::post('/adoptions', [AdoptionController::class, 'store']);

    Route::get('/my-donations', [DonationController::class, 'index']);
    Route::post('/donations', [DonationController::class, 'store']);

    Route::get('/my-grooming', [GroomingReservationController::class, 'index']);
    Route::post('/grooming', [GroomingReservationController::class, 'store']);

    Route::post('/testimonials', [TestimonialController::class, 'store']);
    Route::get('/my-coupling-requests', [CouplingRequestController::class, 'index']);
    Route::post('/coupling-requests', [CouplingRequestController::class, 'store']);
    Route::get('/coupling-requests/{couplingRequest}', [CouplingRequestController::class, 'show']);
});
