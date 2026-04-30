<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Donation extends Model
{
    protected $fillable = [
        'user_id',
        'amount',
        'payment_method',
        'type',
        'status',
        'donation_date',
        'message',
        'admin_notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'donation_date' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
