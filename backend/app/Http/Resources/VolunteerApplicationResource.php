<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VolunteerApplicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'message' => $this->message,
            'status' => $this->status,
            'notes' => $this->when($request->user()?->isAdmin(), $this->notes),
            'rejection_reason' => $this->when($this->status === 'rejected', $this->notes),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
