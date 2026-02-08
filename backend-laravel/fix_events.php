<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Event;

try {
    $count = Event::count();
    echo "Found $count events.\n";

    if ($count > 0) {
        $updated = Event::query()->update([
            'time' => '15:00',
            'location' => 'IFIAG'
        ]);
        echo "Updated $updated events to 15:00 and IFIAG.\n";
        
        $first = Event::first();
        echo "Verification - First Event:\n";
        echo "Time: " . $first->time . "\n";
        echo "Location: " . $first->location . "\n";
    } else {
        // Create an event if none exists for testing
        $event = Event::create([
            'title' => 'Job Day IFIAG',
            'date' => '2026-02-14',
            'time' => '15:00',
            'location' => 'IFIAG',
            'description' => 'Un grand événement pour l\'emploi.'
        ]);
        echo "Created a new test event.\n";
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
