<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Animal extends Model
{
    protected $fillable = [
        'nom',
        'espece',
        'race',
        'age',
        'sexe',
        'description',
        'photo',
        'statut',
        'taille',
        'vaccine',
        'photos',
    ];

    protected $casts = [
        'vaccine' => 'boolean',
        'photos' => 'array',
    ];

    public function adoptions(): HasMany
    {
        return $this->hasMany(Adoption::class);
    }

    public function groomingReservations(): HasMany
    {
        return $this->hasMany(GroomingReservation::class);
    }
}
