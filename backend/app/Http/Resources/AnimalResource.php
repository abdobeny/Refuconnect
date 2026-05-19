<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnimalResource extends JsonResource
{
    private function photoUrls(): array
    {
        $photos = $this->photos ?? [];

        if (is_string($photos)) {
            $decoded = json_decode($photos, true);
            $photos = json_last_error() === JSON_ERROR_NONE ? $decoded : [$photos];
        }

        if (! is_array($photos)) {
            return [];
        }

        return collect($photos)
            ->filter()
            ->map(function (string $photo): string {
                if (str_starts_with($photo, 'http://') || str_starts_with($photo, 'https://')) {
                    return $photo;
                }

                return asset(ltrim($photo, '/'));
            })
            ->values()
            ->all();
    }

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
            'photos' => $this->photoUrls(),
            'status' => $this->status,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
