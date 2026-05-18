<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('role', 'utilisateur')->get();

        $testimonials = [
            [
                'name' => 'Salma R.',
                'role' => 'Adoptante',
                'quote' => 'La fiche de Nala était claire et l’équipe nous a guidés avant la rencontre. On savait exactement à quoi s’attendre.',
                'detail' => 'Adoption confirmée après deux échanges',
            ],
            [
                'name' => 'Yassine B.',
                'role' => 'Bénévole',
                'quote' => 'Les demandes sont bien organisées. Pour le refuge, ça aide à répondre plus vite et à mieux suivre chaque adoption.',
                'detail' => 'Suivi des dossiers et visites',
            ],
            [
                'name' => 'Mina L.',
                'role' => 'Donatrice',
                'quote' => 'Même sans adopter, j’ai pu aider avec un don et suivre les besoins du refuge de manière simple.',
                'detail' => 'Participation aux soins mensuels',
            ],
        ];

        foreach ($testimonials as $index => $testimonial) {
            Testimonial::updateOrCreate(
                ['name' => $testimonial['name'], 'quote' => $testimonial['quote']],
                [
                    ...$testimonial,
                    'user_id' => $users->get($index)?->id,
                    'status' => 'approved',
                    'featured' => true,
                    'sort_order' => $index + 1,
                ],
            );
        }
    }
}
