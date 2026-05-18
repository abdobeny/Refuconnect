<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Animal extends Model
{
    protected $fillable = [
        'name',
        'species',
        'breed',
        'age',
        'sex',
        'description',
        'size',
        'vaccinated',
        'sterilized',
        'health_status',
        'status',
        'photos',
    ];

    protected $casts = [
        'vaccinated' => 'boolean',
        'sterilized' => 'boolean',
        'photos' => 'array',  // JSON to PHP array
        'age' => 'integer',
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
