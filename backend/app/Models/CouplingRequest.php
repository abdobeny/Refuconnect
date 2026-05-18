<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CouplingRequest extends Model
{
    protected $fillable = [
        'user_id',
        'contact_phone',
        'pet_species',
        'pet_breed',
        'pet_sex',
        'pet_age',
        'vaccinated',
        'health_status',
        'preferred_breed',
        'message',
        'estimated_price',
        'status',
        'admin_notes',
    ];

    protected $casts = [
        'estimated_price' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
