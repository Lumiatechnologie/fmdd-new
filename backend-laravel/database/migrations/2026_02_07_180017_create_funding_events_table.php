<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('funding_events', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description');
            $table->string('type'); // COMPETITION, GRANT, INVESTMENT
            $table->string('organizer')->nullable();
            $table->timestamp('deadline');
            $table->string('amount')->nullable(); // Prize/funding amount
            $table->json('requirements')->nullable(); // JSON array
            $table->string('application_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('funding_events');
    }
};
