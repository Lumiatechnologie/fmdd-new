<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_offers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('company');
            $table->string('location');
            $table->string('type'); // CDI, Stage, Freelance
            $table->string('category')->nullable(); // Business, Tech, Agri, etc.
            $table->string('duration')->nullable(); // 6 months, Permanent
            $table->string('salary')->nullable();
            $table->text('description');
            $table->text('skills')->nullable(); // Comma-separated
            $table->boolean('is_remote')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_offers');
    }
};
