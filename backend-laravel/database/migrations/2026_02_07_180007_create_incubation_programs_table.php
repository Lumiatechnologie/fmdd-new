<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('incubation_programs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description');
            $table->json('objectives'); // JSON array
            $table->json('stages'); // JSON array of stages
            $table->string('duration')->nullable(); // e.g., "6 months"
            $table->json('requirements')->nullable(); // JSON array
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('incubation_programs');
    }
};
