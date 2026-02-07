<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Profile;
use App\Models\Formation;
use App\Models\JobOffer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User
        $admin = User::create([
            'email' => 'admin@fmdd.com',
            'password' => Hash::make('admin123'),
            'role' => 'ADMIN',
        ]);

        Profile::create([
            'user_id' => $admin->id,
            'first_name' => 'FMDD',
            'last_name' => 'Administrator',
            'bio' => 'Platform administrator account',
            'skills' => ['Management', 'Leadership', 'Platform Administration'],
            'preferences' => ['language' => 'fr'],
        ]);

        $this->command->info('✅ Admin account created: admin@fmdd.com / admin123');

        // Create Regular User
        $user = User::create([
            'email' => 'user@test.com',
            'password' => Hash::make('user123'),
            'role' => 'USER',
        ]);

        Profile::create([
            'user_id' => $user->id,
            'first_name' => 'Test',
            'last_name' => 'User',
            'bio' => 'Regular test user account',
            'skills' => ['Communication', 'Teamwork', 'Problem Solving'],
            'preferences' => ['language' => 'en'],
        ]);

        $this->command->info('✅ User account created: user@test.com / user123');

        // Create Formation (Course)
        $formation = Formation::create([
            'title' => 'Introduction au Marketing Digital',
            'description' => 'Apprenez les bases du marketing digital: SEO, réseaux sociaux, email marketing, et publicité en ligne. Formation complète pour débutants.',
            'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
            'duration' => '6 semaines',
            'level' => 'Débutant',
            'category' => 'Marketing',
            'is_paid' => false,
        ]);

        $this->command->info('✅ Formation created: ' . $formation->title);

        // Create Job Offer
        $job = JobOffer::create([
            'title' => 'Développeur Web Full Stack',
            'company' => 'Tech Innovators SARL',
            'location' => 'Casablanca, Maroc',
            'type' => 'CDI',
            'category' => 'Tech',
            'duration' => 'Permanent',
            'salary' => '8000 - 12000 MAD',
            'description' => 'Nous recherchons un développeur web full stack passionné pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants utilisant React, Node.js et Laravel.',
            'skills' => 'JavaScript, React, Node.js, Laravel, MySQL, Git',
            'is_remote' => true,
        ]);

        $this->command->info('✅ Job Offer created: ' . $job->title);

        $this->command->info("\n🎉 Test data seeding completed successfully!\n");
    }
}
