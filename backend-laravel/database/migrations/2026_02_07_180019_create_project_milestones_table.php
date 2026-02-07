<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_milestones', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('project_id');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('status')->default('PENDING'); // PENDING, IN_PROGRESS, COMPLETED
            $table->timestamp('due_date')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->integer('order');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_milestones');
    }
};
