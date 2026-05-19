<?php

namespace Database\Seeders;

use App\Models\CouplingRequest;
use App\Models\User;
use Illuminate\Database\Seeder;

class CouplingRequestSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('role', 'utilisateur')->get();

        $requests = [
            [
                'user_index' => 0,
                'contact_phone' => '06 12 34 56 78',
                'pet_species' => 'dog',
                'pet_breed' => 'Berger Allemand',
                'pet_sex' => 'male',
                'pet_age' => '3 ans',
                'vaccinated' => 'yes',
                'health_status' => 'Excellent état, suivi régulier',
                'preferred_breed' => 'Berger Allemand ou Malinois',
                'message' => 'Mon chien est très sociable et bien éduqué. Je cherche une femelle compatible pour une portée.',
                'estimated_price' => 400.00,
                'status' => 'approved',
                'admin_notes' => 'Dossier complet. Chien inscrit LOF. Compatible avec femelles du refuge.',
            ],
            [
                'user_index' => 1,
                'contact_phone' => '06 98 76 54 32',
                'pet_species' => 'cat',
                'pet_breed' => 'Maine Coon',
                'pet_sex' => 'female',
                'pet_age' => '2 ans',
                'vaccinated' => 'yes',
                'health_status' => 'Bonne santé',
                'preferred_breed' => 'Maine Coon',
                'message' => 'Ma chatte est stérilisée mais je cherche un mâle pour une portée exceptionnelle (dérogation vétérinaire).',
                'estimated_price' => null,
                'status' => 'pending',
                'admin_notes' => null,
            ],
            [
                'user_index' => 2,
                'contact_phone' => '07 11 22 33 44',
                'pet_species' => 'dog',
                'pet_breed' => 'Labrador',
                'pet_sex' => 'female',
                'pet_age' => '4 ans',
                'vaccinated' => 'unknown',
                'health_status' => 'À vérifier',
                'preferred_breed' => 'Labrador',
                'message' => 'Chienne douce, cherche compagnon compatible.',
                'estimated_price' => 300.00,
                'status' => 'pending',
                'admin_notes' => 'Vaccins à confirmer avant validation.',
            ],
            [
                'user_index' => 3,
                'contact_phone' => '06 55 44 33 22',
                'pet_species' => 'cat',
                'pet_breed' => 'Européen',
                'pet_sex' => 'male',
                'pet_age' => '1 an',
                'vaccinated' => 'no',
                'health_status' => 'Jeune et en bonne santé',
                'preferred_breed' => 'Toutes races',
                'message' => 'Chaton vigoureux, cherche femelle.',
                'estimated_price' => null,
                'status' => 'rejected',
                'admin_notes' => 'Rejeté: vaccins non à jour, âge trop jeune pour couplage responsable.',
            ],
            [
                'user_index' => 4,
                'contact_phone' => '07 66 77 88 99',
                'pet_species' => 'dog',
                'pet_breed' => 'Golden Retriever',
                'pet_sex' => 'male',
                'pet_age' => '5 ans',
                'vaccinated' => 'yes',
                'health_status' => 'Parfait état, tests génétiques OK',
                'preferred_breed' => 'Golden Retriever',
                'message' => 'Chien LOF, champion de beauté. Recherche femelle de qualité.',
                'estimated_price' => 600.00,
                'status' => 'approved',
                'admin_notes' => 'Excellent profil. Tests génétiques validés. Priorité.',
            ],
        ];

        foreach ($requests as $data) {
            $user = $users->get($data['user_index']);

            if ($user) {
                CouplingRequest::create([
                    'user_id' => $user->id,
                    'contact_phone' => $data['contact_phone'],
                    'pet_species' => $data['pet_species'],
                    'pet_breed' => $data['pet_breed'],
                    'pet_sex' => $data['pet_sex'],
                    'pet_age' => $data['pet_age'],
                    'vaccinated' => $data['vaccinated'],
                    'health_status' => $data['health_status'],
                    'preferred_breed' => $data['preferred_breed'],
                    'message' => $data['message'],
                    'estimated_price' => $data['estimated_price'],
                    'status' => $data['status'],
                    'admin_notes' => $data['admin_notes'],
                ]);
            }
        }
    }
}
