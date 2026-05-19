<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('donations', function (Blueprint $table) {
            $table->string('paypal_order_id')->nullable()->after('payment_method')->index();
            $table->string('paypal_capture_id')->nullable()->after('paypal_order_id');
            $table->string('paypal_payer_id')->nullable()->after('paypal_capture_id');
            $table->timestamp('payment_completed_at')->nullable()->after('paypal_payer_id');
        });
    }

    public function down(): void
    {
        Schema::table('donations', function (Blueprint $table) {
            $table->dropIndex(['paypal_order_id']);
            $table->dropColumn([
                'paypal_order_id',
                'paypal_capture_id',
                'paypal_payer_id',
                'payment_completed_at',
            ]);
        });
    }
};
