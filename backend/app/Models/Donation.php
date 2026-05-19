<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Donation extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'amount',
        'item_description',
        'status',
        'donation_date',
        'message',
        'admin_notes',
        'payment_method',
        'paypal_order_id',
        'paypal_capture_id',
        'paypal_payer_id',
        'payment_completed_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'donation_date' => 'date',
        'payment_completed_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
