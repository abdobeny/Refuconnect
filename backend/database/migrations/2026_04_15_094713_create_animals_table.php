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
        Schema::create('animals', function (Blueprint $table) {
            $table->id();
            
            // Basic info
            $table->string('name');                    // Was: nom
            $table->enum('species', ['dog', 'cat']);     // Was: espece (Chien/Chat)
            $table->string('breed');                     // Was: race
            $table->integer('age')->nullable();
            $table->enum('sex', ['male', 'female']);     // Was: sexe (mâle/femelle)
            
            // Details
            $table->text('description')->nullable();
            $table->enum('size', ['small', 'medium', 'large'])->nullable();  // New field
            $table->boolean('vaccinated')->default(false);                   // New field
            $table->boolean('sterilized')->default(false);                     // New field
            $table->enum('health_status', ['good', 'fair', 'critical'])->default('good'); // New field
            
            // Status and photos
            $table->enum('status', ['available', 'adopted', 'in_care'])->default('available');  // Was: statut
            $table->json('photos')->nullable();        // Multiple photos as JSON array
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};