<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnimalResource;
use App\Models\Animal;
use Illuminate\Http\Request;

class AnimalController extends Controller
{
    public function index(Request $request)
    {
        $query = Animal::query()
            ->where('status', 'available');

        if ($request->filled('species')) {
            $query->where('species', $request->string('species'));
        }

        if ($request->filled('breed')) {
            $query->whereRaw('LOWER(breed) LIKE ?', ['%'.strtolower($request->string('breed')).'%']);
        }

        if ($request->filled('sex')) {
            $query->where('sex', $request->string('sex'));
        }

        if ($request->filled('search')) {
            $search = $request->string('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('breed', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $perPage = min((int) $request->input('per_page', 15), 50);
        $animals = $query
            ->latest()
            ->paginate($perPage);

        return AnimalResource::collection($animals);
    }

    public function show(int $animal)
    {
        $record = Animal::query()
            ->where('id', $animal)
            ->whereIn('status', ['available', 'in_care'])
            ->firstOrFail();

        return new AnimalResource($record);
    }
}
