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
            $table->foreignId('user_id')->constrained();
            $table->string('animal_name'); // User's own animal 
            $table->dateTime('reservation_date');
            $table->enum('type_soin', ['bain', 'tonte', 'nettoyage']);
            $table->enum('statut', ['confirmé', 'annulé', 'terminé'])->default('confirmé');
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
