<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('status')->default('IDEATION'); // IDEATION, MVP, GROWTH
            $table->json('diagnostic')->nullable(); // JSON response from diagnostic quiz
            $table->uuid('program_id')->nullable();
            $table->foreign('program_id')->references('id')->on('incubation_programs')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
