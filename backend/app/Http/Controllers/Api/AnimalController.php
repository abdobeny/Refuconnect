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
        $query = Animal::query();

        $status = $request->input('status', 'available');
        if ($status !== 'all') {
            $query->where('status', $status);
        }

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
        $animals = $query->latest()->paginate($perPage);

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

    // Admin CRUD endpoints
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'species' => 'required|in:dog,cat,other',
            'breed' => 'required|string|max:255',
            'age' => 'required|integer|min:0',
            'sex' => 'required|in:male,female',
            'description' => 'nullable|string',
            'size' => 'required|in:small,medium,large',
            'vaccinated' => 'boolean',
            'sterilized' => 'boolean',
            'health_status' => 'required|in:good,fair,poor',
            'status' => 'required|in:available,in_care,adopted,unavailable',
            'photos' => 'nullable|array',
            'photos.*' => 'string|url',
        ]);

        $animal = Animal::create($validated);

        return response()->json([
            'message' => 'Animal créé avec succès',
            'data' => new AnimalResource($animal),
        ], 201);
    }

    public function update(Request $request, Animal $animal)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'species' => 'sometimes|required|in:dog,cat,other',
            'breed' => 'sometimes|required|string|max:255',
            'age' => 'sometimes|required|integer|min:0',
            'sex' => 'sometimes|required|in:male,female',
            'description' => 'nullable|string',
            'size' => 'sometimes|required|in:small,medium,large',
            'vaccinated' => 'boolean',
            'sterilized' => 'boolean',
            'health_status' => 'sometimes|required|in:good,fair,poor',
            'status' => 'sometimes|required|in:available,in_care,adopted,unavailable',
            'photos' => 'nullable|array',
            'photos.*' => 'string|url',
        ]);

        $animal->update($validated);

        return response()->json([
            'message' => 'Animal mis à jour avec succès',
            'data' => new AnimalResource($animal),
        ]);
    }

    public function destroy(Animal $animal)
    {
        $name = $animal->name;
        $animal->delete();

        return response()->json([
            'message' => "Animal '{$name}' supprimé avec succès",
        ]);
    }

    public function updateStatus(Request $request, Animal $animal)
    {
        $validated = $request->validate([
            'status' => 'required|in:available,in_care,adopted,unavailable',
        ]);

        $animal->update(['status' => $validated['status']]);

        return response()->json([
            'message' => 'Statut mis à jour avec succès',
            'data' => new AnimalResource($animal),
        ]);
    }

    private function authorizeAdmin()
    {
        if (!auth('sanctum')->check() || auth('sanctum')->user()->role !== 'admin') {
            abort(403, 'Non autorisé');
        }
    }
}
