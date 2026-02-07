<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('funding_applications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('project_id');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->uuid('event_id');
            $table->foreign('event_id')->references('id')->on('funding_events')->onDelete('cascade');
            $table->string('status')->default('SUBMITTED'); // SUBMITTED, UNDER_REVIEW, ACCEPTED, REJECTED
            $table->timestamp('submitted_at')->useCurrent();
            $table->json('documents')->nullable(); // JSON array of document URLs
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->unique(['project_id', 'event_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('funding_applications');
    }
};
