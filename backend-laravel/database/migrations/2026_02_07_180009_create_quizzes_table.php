<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('module_id')->nullable();
            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
            $table->uuid('interview_prep_id')->nullable();
            $table->foreign('interview_prep_id')->references('id')->on('interview_preps')->onDelete('cascade');
            $table->string('title');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
