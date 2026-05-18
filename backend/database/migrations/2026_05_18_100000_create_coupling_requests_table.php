<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('coupling_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('contact_phone');
            $table->enum('pet_species', ['dog', 'cat']);
            $table->string('pet_breed');
            $table->enum('pet_sex', ['male', 'female']);
            $table->string('pet_age');
            $table->enum('vaccinated', ['yes', 'no', 'unknown'])->default('unknown');
            $table->string('health_status')->nullable();
            $table->string('preferred_breed')->nullable();
            $table->text('message')->nullable();
            $table->decimal('estimated_price', 10, 2)->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected', 'completed'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });

        Schema::dropIfExists('race_couplings');
    }

    public function down(): void
    {
        Schema::dropIfExists('coupling_requests');

        Schema::create('race_couplings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('animal_male_id')->constrained('animals')->onDelete('cascade');
            $table->foreignId('animal_female_id')->constrained('animals')->onDelete('cascade');
            $table->decimal('price', 10, 2)->default(0);
            $table->enum('status', ['pending', 'approved', 'rejected', 'completed'])->default('pending');
            $table->enum('payment_status', ['unpaid', 'paid', 'refunded'])->default('unpaid');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }
};
