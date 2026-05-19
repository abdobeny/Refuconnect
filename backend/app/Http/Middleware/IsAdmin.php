<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth('sanctum')->check()) {
            return response()->json(['message' => 'Authentification requise'], 401);
        }

        if (auth('sanctum')->user()->role !== 'admin') {
            return response()->json(['message' => 'Accès refusé. Vous devez être administrateur'], 403);
        }

        return $next($request);
    }
}
