<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('course_progressions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->uuid('formation_id');
            $table->foreign('formation_id')->references('id')->on('formations')->onDelete('cascade');
            $table->integer('progress')->default(0); // Percentage
            $table->boolean('is_completed')->default(false);
            $table->timestamps();
            
            $table->unique(['user_id', 'formation_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_progressions');
    }
};
