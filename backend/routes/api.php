<?php

use App\Http\Controllers\Api\AdoptionController;
use App\Http\Controllers\Api\AnimalController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\GroomingReservationController;
use App\Http\Controllers\Api\TestimonialController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Animals - public read
Route::get('/animals', [AnimalController::class, 'index']);
Route::get('/animals/{animal}', [AnimalController::class, 'show']);

// Homepage social proof
Route::get('/testimonials', [TestimonialController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // User-specific routes
    Route::get('/my-adoptions', [AdoptionController::class, 'myAdoptions']);
    Route::post('/adoptions', [AdoptionController::class, 'store']);
    
    Route::get('/my-donations', [DonationController::class, 'myDonations']);
    Route::post('/donations', [DonationController::class, 'store']);
    
    Route::get('/my-grooming', [GroomingReservationController::class, 'myReservations']);
    Route::post('/grooming', [GroomingReservationController::class, 'store']);

    Route::post('/testimonials', [TestimonialController::class, 'store']);
});
