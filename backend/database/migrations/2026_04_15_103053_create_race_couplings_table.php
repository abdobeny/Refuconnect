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
            $table->string('race');
            $table->decimal('tarif', 8, 2); // Price for the service 
            $table->text('description_accouplement')->nullable();
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
