<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Event::updateOrCreate(
            ['title' => 'Job Day FMDD'],
            [
                'date' => '2026-02-14',
                'description' => 'Événement de recrutement annuel du Forum Marocain pour le Développement Durable.',
                'image_path' => 'uploads/events/job_day_fmdd_2026.jpeg',
            ]
        );

        \App\Models\Event::updateOrCreate(
            ['title' => 'Job Day IFIAG'],
            [
                'date' => '2026-02-14',
                'description' => "Le Job Day IFIAG est dédié aux étudiants et stagiaires IFIAG. Domaines : IT, RH, Gestion & Management, Marketing & Com, Finance & Compta. Horaire : À partir de 15h00.",
                'image_path' => 'uploads/events/job_day_fmdd_2026.jpeg', // Utilise la même image comme demandé
            ]
        );
    }
}
