<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DonationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->whenLoaded('user')),
            'type' => $this->type,
            'amount' => $this->amount,
            'item_description' => $this->item_description,
            'status' => $this->status,
            'payment_method' => $this->payment_method,
            'paypal_order_id' => $this->paypal_order_id,
            'paypal_capture_id' => $this->paypal_capture_id,
            'payment_completed_at' => $this->payment_completed_at?->toIso8601String(),
            'donation_date' => $this->donation_date?->toIso8601String(),
            'message' => $this->message,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
