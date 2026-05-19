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

    return redirect(config('app.frontend_url') . '/#bridge_token=' . $token);
})->middleware('auth');

Route::get('/api/bridge-auth', function () {
    return response()->json(['message' => 'Use URL hash fragment for bridge auth'], 410);
})->middleware('web');
