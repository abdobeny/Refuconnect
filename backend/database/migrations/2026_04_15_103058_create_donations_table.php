<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            
            // Donor (nullable for anonymous donations)
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            
            // Donation type and amount
            $table->enum('type', ['financial', 'food', 'material']);  // financier, nourriture, materiel
            $table->decimal('amount', 10, 2)->nullable();  // For financial donations
            $table->string('item_description')->nullable();  // For food/material donations
            
            // Payment details
            $table->enum('payment_method', ['cash', 'card', 'bank_transfer', 'paypal', 'other'])->nullable();
            $table->enum('status', ['pending', 'completed', 'failed', 'refunded'])->default('pending');
            
            // Dates and messages
            $table->date('donation_date')->default(now());
            $table->text('message')->nullable();  // Donor's message
            $table->text('admin_notes')->nullable();  // Internal notes
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};