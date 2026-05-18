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
        Schema::create('grooming_reservations', function (Blueprint $table) {
            $table->id();
            
            // Customer
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Service details
            $table->enum('service_type', ['bath', 'haircut', 'full_grooming', 'nail_trim', 'other']);
            $table->dateTime('reservation_date');
            
            // Pet info (since it's the owner's pet, not a shelter animal)
            $table->string('pet_name');  // Was: animal_name
            $table->enum('pet_type', ['dog', 'cat', 'other'])->default('dog');
            
            // Status
            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed'])->default('pending');
            
            // Notes
            $table->text('notes')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grooming_reservations');
    }
};