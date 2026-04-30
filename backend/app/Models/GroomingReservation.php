<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GroomingReservation extends Model
{
    protected $fillable = [
        'user_id',
        'animal_id',
        'service_type',
        'reservation_date',
        'status',
        'notes',
        'animal_name',
        'type_soin',
        'statut',
    ];

    protected $casts = [
        'reservation_date' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function animal(): BelongsTo
    {
        return $this->belongsTo(Animal::class);
    }
}
