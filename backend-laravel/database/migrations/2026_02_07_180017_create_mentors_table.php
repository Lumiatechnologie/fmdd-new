<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mentors', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->unique();
            $table->json('expertise'); // JSON array of expertise areas
            $table->text('bio')->nullable();
            $table->json('availability')->nullable(); // JSON schedule
            $table->float('rating')->default(0);
            $table->integer('sessions_count')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mentors');
    }
};
