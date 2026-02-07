<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mentorship_sessions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('mentoring_id');
            $table->foreign('mentoring_id')->references('id')->on('mentorings')->onDelete('cascade');
            $table->uuid('mentor_id');
            $table->foreign('mentor_id')->references('id')->on('mentors')->onDelete('cascade');
            $table->timestamp('scheduled_at');
            $table->integer('duration')->default(60); // minutes
            $table->string('status')->default('SCHEDULED'); // SCHEDULED, COMPLETED, CANCELLED
            $table->text('notes')->nullable();
            $table->json('feedback')->nullable(); // JSON with rating and comments
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mentorship_sessions');
    }
};
