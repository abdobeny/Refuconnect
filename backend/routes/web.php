<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/to-frontend', function () {
    $user = auth()->user();
    if (!$user || !$user->isAdmin()) {
        abort(403);
    }

    $token = $user->createToken('frontend-bridge', ['*'], now()->addMinutes(15))->plainTextToken;

    session(['frontend_bridge_token' => $token]);

    return redirect(env('FRONTEND_URL', 'http://localhost:5173') . '/?bridge=1');
})->middleware('auth');

Route::get('/api/bridge-auth', function () {
    $token = session()->pull('frontend_bridge_token');

    if (!$token) {
        return response()->json(['message' => 'No bridge token available'], 404);
    }

    return response()->json(['token' => $token]);
})->middleware('web');
