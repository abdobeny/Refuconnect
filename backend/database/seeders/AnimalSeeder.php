<?php

namespace Database\Seeders;

use App\Models\Animal;
use Illuminate\Database\Seeder;

class AnimalSeeder extends Seeder
{
    public function run(): void
    {
        $catImages = [
            '/storage/animals/cat1.jfif',
            '/storage/animals/cat2.jfif',
            '/storage/animals/cat3.jfif',
            '/storage/animals/cat4.jfif',
            '/storage/animals/cat5.jfif',
        ];

        $dogImages = [
            '/storage/animals/dog1.jpg',
            '/storage/animals/dog2.webp',
            '/storage/animals/dog3.webp',
            '/storage/animals/dog4.webp',
            '/storage/animals/dog5.webp',
            '/storage/animals/dog6.jfif',
            '/storage/animals/dog7.webp',
            '/storage/animals/dog8.jfif',
            '/storage/animals/dog9.jfif',
            '/storage/animals/dog10.jfif',
            '/storage/animals/dog11.webp',
            '/storage/animals/dog12.webp',
            '/storage/animals/dog13.webp',
            '/storage/animals/dog14.webp',
            '/storage/animals/dog15.webp',
            '/storage/animals/dog16.webp',
        ];

        $animals = [];

        /* =========================
           🐱 CATS (5)
        ========================= */
        $cats = [
            ['name' => 'Luna', 'breed' => 'Siamois', 'age' => 2, 'sex' => 'female'],
            ['name' => 'Milo', 'breed' => 'Européen', 'age' => 1, 'sex' => 'male'],
            ['name' => 'Nala', 'breed' => 'Maine Coon', 'age' => 3, 'sex' => 'female'],
            ['name' => 'Simba', 'breed' => 'Bengal', 'age' => 1, 'sex' => 'male'],
            ['name' => 'Choco', 'breed' => 'Persan', 'age' => 4, 'sex' => 'male'],
        ];

        foreach ($cats as $i => $cat) {
            $animals[] = [
                'name' => $cat['name'],
                'species' => 'cat',
                'breed' => $cat['breed'],
                'age' => $cat['age'],
                'sex' => $cat['sex'],
                'description' => 'Chat ' . strtolower($cat['breed']) . ' très affectueux et calme.',
                'status' => 'available',
                'size' => 'small',
                'vaccinated' => (bool)rand(0, 1),
                'sterilized' => (bool)rand(0, 1),
                'health_status' => 'good',
                'photos' => [$catImages[$i]],
            ];
        }

        /* =========================
           🐶 DOGS (16)
        ========================= */
        $dogs = [
            ['name' => 'Max', 'breed' => 'Berger Allemand', 'age' => 3, 'sex' => 'male'],
            ['name' => 'Rocky', 'breed' => 'Labrador', 'age' => 5, 'sex' => 'male'],
            ['name' => 'Bella', 'breed' => 'Golden Retriever', 'age' => 4, 'sex' => 'female'],
            ['name' => 'Rex', 'breed' => 'Boxer', 'age' => 2, 'sex' => 'male'],
            ['name' => 'Daisy', 'breed' => 'Beagle', 'age' => 6, 'sex' => 'female'],
            ['name' => 'Jack', 'breed' => 'Husky', 'age' => 3, 'sex' => 'male'],
            ['name' => 'Lola', 'breed' => 'Poodle', 'age' => 2, 'sex' => 'female'],
            ['name' => 'Thor', 'breed' => 'Rottweiler', 'age' => 4, 'sex' => 'male'],
            ['name' => 'Zara', 'breed' => 'Doberman', 'age' => 3, 'sex' => 'female'],
            ['name' => 'Bobby', 'breed' => 'Bulldog', 'age' => 5, 'sex' => 'male'],
            ['name' => 'Nero', 'breed' => 'Akita', 'age' => 3, 'sex' => 'male'],
            ['name' => 'Maya', 'breed' => 'Shiba Inu', 'age' => 2, 'sex' => 'female'],
            ['name' => 'Kira', 'breed' => 'Cocker Spaniel', 'age' => 4, 'sex' => 'female'],
            ['name' => 'Bruno', 'breed' => 'Saint Bernard', 'age' => 6, 'sex' => 'male'],
            ['name' => 'Sky', 'breed' => 'Border Collie', 'age' => 2, 'sex' => 'female'],
            ['name' => 'Ghost', 'breed' => 'Malinois', 'age' => 3, 'sex' => 'male'],
        ];

        foreach ($dogs as $i => $dog) {
            $animals[] = [
                'name' => $dog['name'],
                'species' => 'dog',
                'breed' => $dog['breed'],
                'age' => $dog['age'],
                'sex' => $dog['sex'],
                'description' => 'Chien ' . strtolower($dog['breed']) . ' énergique et très sociable.',
                'status' => 'available',
                'size' => in_array($dog['breed'], ['Chihuahua', 'Poodle']) ? 'small'
                    : (in_array($dog['breed'], ['Beagle', 'Border Collie', 'Boxer']) ? 'medium' : 'large'),
                'vaccinated' => true,
                'sterilized' => (bool)rand(0, 1),
                'health_status' => ['good', 'fair'][rand(0, 1)],
                'photos' => [$dogImages[$i]],
            ];
        }

        /* =========================
           SAVE INTO DB
        ========================= */
        foreach ($animals as $animal) {
            Animal::updateOrCreate(
                ['name' => $animal['name']],
                $animal
            );
        }
    }
}
