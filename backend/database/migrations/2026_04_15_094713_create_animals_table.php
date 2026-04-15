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
            $table->string('nom');
            $table->string('espece'); // e.g., Chien, Chat 
            $table->string('race');
            $table->integer('age');
            $table->enum('sexe', ['mâle', 'femelle']);
            $table->text('description');
            $table->string('photo')->nullable();
            $table->enum('statut', ['disponible', 'adopté', 'en soins'])->default('disponible');
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
