<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdoptionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->whenLoaded('user')),
            'animal' => new AnimalResource($this->whenLoaded('animal')),
            'status' => $this->status,
            'requested_at' => $this->requested_at?->toIso8601String(),
            'motivation' => $this->motivation,
            'notes' => $this->when($request->user()?->isAdmin(), $this->notes),
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
