<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnimalResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'species' => $this->species,
            'breed' => $this->breed,
            'age' => $this->age,
            'sex' => $this->sex,
            'size' => $this->size,
            'vaccinated' => $this->vaccinated,
            'sterilized' => $this->sterilized,
            'health_status' => $this->health_status,
            'description' => $this->description,
            'photos' => $this->photos,
            'status' => $this->status,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}