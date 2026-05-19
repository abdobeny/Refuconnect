<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // For SQLite, we need to use raw SQL to modify the enum
        if (DB::connection()->getDriverName() === 'sqlite') {
            // SQLite doesn't support direct enum modification, so we need to recreate the column
            Schema::table('animals', function (Blueprint $table) {
                // SQLite approach: create new column, copy data, drop old, rename new
                $table->string('status_new')->default('disponible');
            });

            // Copy existing data with mapping
            DB::statement('UPDATE animals SET status_new = ? WHERE status = ?', ['disponible', 'available']);
            DB::statement('UPDATE animals SET status_new = ? WHERE status = ?', ['adopte', 'adopted']);
            DB::statement('UPDATE animals SET status_new = ? WHERE status = ?', ['en_soins', 'in_care']);

            Schema::table('animals', function (Blueprint $table) {
                $table->dropColumn('status');
            });

            Schema::table('animals', function (Blueprint $table) {
                $table->renameColumn('status_new', 'status');
            });
        } else {
            // For other databases that support enum modification
            Schema::table('animals', function (Blueprint $table) {
                $table->string('status')->change();
            });
        }
    }

    public function down(): void
    {
        if (DB::connection()->getDriverName() === 'sqlite') {
            Schema::table('animals', function (Blueprint $table) {
                $table->string('status_rollback')->default('available');
            });

            DB::statement('UPDATE animals SET status_rollback = ? WHERE status = ?', ['available', 'disponible']);
            DB::statement('UPDATE animals SET status_rollback = ? WHERE status = ?', ['adopted', 'adopte']);
            DB::statement('UPDATE animals SET status_rollback = ? WHERE status = ?', ['in_care', 'en_soins']);

            Schema::table('animals', function (Blueprint $table) {
                $table->dropColumn('status');
            });

            Schema::table('animals', function (Blueprint $table) {
                $table->renameColumn('status_rollback', 'status');
            });
        }
    }
};
