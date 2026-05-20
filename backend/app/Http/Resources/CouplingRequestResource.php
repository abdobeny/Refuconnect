<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CouplingRequestResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->whenLoaded('user')),
            'contact_phone' => $this->contact_phone,
            'pet_species' => $this->pet_species,
            'pet_breed' => $this->pet_breed,
            'pet_sex' => $this->pet_sex,
            'pet_age' => $this->pet_age,
            'vaccinated' => $this->vaccinated,
            'health_status' => $this->health_status,
            'preferred_breed' => $this->preferred_breed,
            'message' => $this->message,
            'estimated_price' => $this->estimated_price,
            'status' => $this->status,
            'admin_notes' => $this->when(
                $request->user()?->isAdmin(),
                $this->admin_notes
            ),
            'rejection_reason' => $this->when($this->status === 'rejected', $this->admin_notes),
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
