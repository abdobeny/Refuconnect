<?php

namespace Database\Seeders;

use App\Models\Adoption;
use App\Models\Animal;
use App\Models\User;
use Illuminate\Database\Seeder;

class AdoptionSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('role', 'utilisateur')->get();
        $animals = Animal::where('status', 'available')->get();

        $adoptions = [
            [
                'user_index' => 0,
                'animal_index' => 0,
                'status' => 'approved',
                'motivation' => 'Je cherche un compagnon fidèle pour accompagner mes randonnées. Max semble parfait avec son énergie et son caractère sportif.',
                'notes' => 'Visite effectuée le 15/05. Famille avec jardin clôturé. Validé.',
                'requested_at' => now()->subDays(10),
            ],
            [
                'user_index' => 1,
                'animal_index' => 1,
                'status' => 'pending',
                'motivation' => 'Luna est magnifique et semble très calme. J\'habite en appartement et cherche un chat sociable.',
                'notes' => null,
                'requested_at' => now()->subDays(2),
            ],
            [
                'user_index' => 2,
                'animal_index' => 2,
                'status' => 'pending',
                'motivation' => 'Rocky a l\'air très gentil avec les enfants. Nous avons deux petits de 5 et 7 ans.',
                'notes' => null,
                'requested_at' => now()->subDays(1),
            ],
            [
                'user_index' => 3,
                'animal_index' => 3,
                'status' => 'rejected',
                'motivation' => 'Je veux un chaton pour ma fille.',
                'notes' => 'Rejeté: pas assez d\'informations, appartement trop petit pour un chaton actif.',
                'requested_at' => now()->subDays(15),
            ],
            [
                'user_index' => 4,
                'animal_index' => 0,
                'status' => 'pending',
                'motivation' => 'Expérience avec les bergers allemands. Ancien éducateur canin. Maison avec grand terrain.',
                'notes' => 'Profil très sérieux. À prioriser.',
                'requested_at' => now()->subHours(6),
            ],
            [
                'user_index' => 5,
                'animal_index' => 2,
                'status' => 'approved',
                'motivation' => 'Retraité, beaucoup de temps à offrir. Rocky mérite une famille aimante.',
                'notes' => 'Approuvé. Rendez-vous prévu le 22/05.',
                'requested_at' => now()->subDays(8),
            ],
        ];

        foreach ($adoptions as $data) {
            $user = $users->get($data['user_index']);
            $animal = $animals->get($data['animal_index']);

            if ($user && $animal) {
                Adoption::create([
                    'user_id' => $user->id,
                    'animal_id' => $animal->id,
                    'status' => $data['status'],
                    'motivation' => $data['motivation'],
                    'notes' => $data['notes'],
                    'requested_at' => $data['requested_at'],
                ]);
            }
        }
    }
}
