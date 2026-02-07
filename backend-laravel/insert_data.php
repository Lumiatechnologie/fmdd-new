<?php

// Run this file with: php insert_data.php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

try {
    // Admin User
    $adminId = Str::uuid()->toString();
    DB::table('users')->insert([
        'id' => $adminId,
        'email' => 'admin@fmdd.com',
        'password' => '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
        'role' => 'ADMIN',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    DB::table('profiles')->insert([
        'id' => Str::uuid()->toString(),
        'user_id' => $adminId,
        'first_name' => 'FMDD',
        'last_name' => 'Administrator',
        'bio' => 'Platform administrator account',
        'skills' => json_encode(['Management', 'Leadership', 'Platform Administration']),
        'preferences' => json_encode(['language' => 'fr']),
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    echo "✅ Admin created: admin@fmdd.com / password123\n";

    // Regular User
    $userId = Str::uuid()->toString();
    DB::table('users')->insert([
        'id' => $userId,
        'email' => 'user@test.com',
        'password' => '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
        'role' => 'USER',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    DB::table('profiles')->insert([
        'id' => Str::uuid()->toString(),
        'user_id' => $userId,
        'first_name' => 'Test',
        'last_name' => 'User',
        'bio' => 'Regular test user account',
        'skills' => json_encode(['Communication', 'Teamwork', 'Problem Solving']),
        'preferences' => json_encode(['language' => 'en']),
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    echo "✅ User created: user@test.com / password123\n";

    // Formation
    DB::table('formations')->insert([
        'id' => Str::uuid()->toString(),
        'title' => 'Introduction au Marketing Digital',
        'description' => 'Apprenez les bases du marketing digital: SEO, réseaux sociaux, email marketing, et publicité en ligne. Formation complète pour débutants.',
        'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
        'duration' => '6 semaines',
        'level' => 'Débutant',
        'category' => 'Marketing',
        'is_paid' => 0,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    echo "✅ Formation created: Introduction au Marketing Digital\n";

    // Job Offer
    DB::table('job_offers')->insert([
        'id' => Str::uuid()->toString(),
        'title' => 'Développeur Web Full Stack',
        'company' => 'Tech Innovators SARL',
        'location' => 'Casablanca, Maroc',
        'type' => 'CDI',
        'category' => 'Tech',
        'duration' => 'Permanent',
        'salary' => '8000 - 12000 MAD',
        'description' => 'Nous recherchons un développeur web full stack passionné pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants utilisant React, Node.js et Laravel.',
        'skills' => 'JavaScript, React, Node.js, Laravel, MySQL, Git',
        'is_remote' => 1,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    echo "✅ Job Offer created: Développeur Web Full Stack\n";

    echo "\n🎉 All test data created successfully!\n\n";
    echo "Login Credentials:\n";
    echo "- Admin: admin@fmdd.com / password123\n";
    echo "- User: user@test.com / password123\n";

} catch (\Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
}
