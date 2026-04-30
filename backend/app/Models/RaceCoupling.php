<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RaceCoupling extends Model
{
    protected $fillable = [
        'user_id',
        'animal_male_id',
        'animal_female_id',
        'price',
        'status',
        'payment_status',
        'notes',
        'race',
        'tarif',
        'description_accouplement',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'tarif' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function animalMale(): BelongsTo
    {
        return $this->belongsTo(Animal::class, 'animal_male_id');
    }

    public function animalFemale(): BelongsTo
    {
        return $this->belongsTo(Animal::class, 'animal_female_id');
    }
}
