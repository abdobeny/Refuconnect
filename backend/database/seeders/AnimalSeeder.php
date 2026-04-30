<?php

namespace Database\Seeders;

use App\Models\Animal;
use Illuminate\Database\Seeder;

class AnimalSeeder extends Seeder
{
    public function run(): void
    {
        $animals = [
            [
                'nom' => 'Max',
                'espece' => 'Chien',
                'race' => 'Berger Allemand',
                'age' => 3,
                'sexe' => 'mâle',
                'description' => 'Chien affectueux et sportif, parfait pour une famille active.',
                'statut' => 'disponible',
                'photo' => 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e',
            ],
            [
                'nom' => 'Luna',
                'espece' => 'Chat',
                'race' => 'Siamois',
                'age' => 2,
                'sexe' => 'femelle',
                'description' => 'Chatte calme et sociable, adore les câlins.',
                'statut' => 'disponible',
                'photo' => 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
            ],
            [
                'nom' => 'Rocky',
                'espece' => 'Chien',
                'race' => 'Labrador',
                'age' => 5,
                'sexe' => 'mâle',
                'description' => 'Gentil labrador très sociable avec les enfants.',
                'statut' => 'disponible',
                'photo' => 'https://images.unsplash.com/photo-1552053831-71594a27632d',
            ],
            [
                'nom' => 'Milo',
                'espece' => 'Chat',
                'race' => 'Européen',
                'age' => 1,
                'sexe' => 'mâle',
                'description' => 'Jeune chat très joueur et curieux.',
                'statut' => 'disponible',
                'photo' => null,
            ],
            [
                'nom' => 'Bella',
                'espece' => 'Chien',
                'race' => 'Golden Retriever',
                'age' => 4,
                'sexe' => 'femelle',
                'description' => 'Superbe golden très douce et obéissante.',
                'statut' => 'adopté',
                'photo' => 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24',
            ],
        ];

        foreach ($animals as $animal) {
            Animal::create($animal);
        }
    }
}