<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Adoption extends Model
{
    protected $fillable = [
        'user_id',
        'animal_id',
        'date_demande',
        'statut',
        'motivation',
        'notes',
    ];

    protected $casts = [
        'date_demande' => 'date',
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
