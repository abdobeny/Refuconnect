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
        Schema::create('race_couplings', function (Blueprint $table) {
            $table->id();
            
            // Who requested the coupling
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // The two animals being paired
            $table->foreignId('animal_male_id')->constrained('animals')->onDelete('cascade');
            $table->foreignId('animal_female_id')->constrained('animals')->onDelete('cascade');
            
            // Pricing
            $table->decimal('price', 10, 2)->default(0);
            
            // Status tracking
            $table->enum('status', ['pending', 'approved', 'rejected', 'completed'])->default('pending');
            $table->enum('payment_status', ['unpaid', 'paid', 'refunded'])->default('unpaid');
            
            // Admin notes
            $table->text('notes')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('race_couplings');
    }
};