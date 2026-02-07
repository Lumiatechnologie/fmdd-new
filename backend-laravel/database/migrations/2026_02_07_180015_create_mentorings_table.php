<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mentorings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('mentor_id');
            $table->foreign('mentor_id')->references('id')->on('users')->onDelete('cascade');
            $table->uuid('mentee_id');
            $table->foreign('mentee_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('status')->default('REQUESTED'); // REQUESTED, ACTIVE, COMPLETED
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mentorings');
    }
};
