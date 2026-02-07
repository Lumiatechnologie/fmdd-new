<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('workshops', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description');
            $table->string('category'); // BUSINESS_MODEL, PITCH, FINANCING
            $table->string('duration')->nullable(); // e.g., "2 hours"
            $table->string('format')->nullable(); // ONLINE, IN_PERSON, HYBRID
            $table->json('resources')->nullable(); // JSON array of resource links
            $table->string('video_url')->nullable();
            $table->integer('max_participants')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('workshops');
    }
};
