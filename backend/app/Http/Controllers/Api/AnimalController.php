<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Animal;
use Illuminate\Http\Request;

class AnimalController extends Controller
{
    public function index()
    {
        $animals = Animal::where('statut', 'disponible')
            ->orWhere('statut', 'Disponible')
            ->get();

        return response()->json($animals);
    }

    public function show(Animal $animal)
    {
        return response()->json($animal);
    }
}
