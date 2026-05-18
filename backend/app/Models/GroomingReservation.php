<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GroomingReservation extends Model
{
    protected $fillable = [
        'user_id',
        'service_type',
        'reservation_date',
        'pet_name',
        'pet_type',
        'status',
        'notes',
    ];

    protected $casts = [
        'reservation_date' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
