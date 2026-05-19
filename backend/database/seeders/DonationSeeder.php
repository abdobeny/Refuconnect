<?php

namespace Database\Seeders;

use App\Models\Donation;
use App\Models\User;
use Illuminate\Database\Seeder;

class DonationSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('role', 'utilisateur')->get();

        $donations = [
            [
                'user_index' => 0,
                'type' => 'financial',
                'amount' => 100.00,
                'status' => 'completed',
                'message' => 'Pour les soins vétérinaires de Max.',
                'donation_date' => now()->subDays(12),
            ],
            [
                'user_index' => 1,
                'type' => 'financial',
                'amount' => 50.00,
                'status' => 'completed',
                'message' => 'Petit geste pour les animaux du refuge.',
                'donation_date' => now()->subDays(8),
            ],
            [
                'user_index' => 2,
                'type' => 'food',
                'amount' => null,
                'item_description' => '2 sacs de croquettes 15kg + 10 boîtes pâtée',
                'status' => 'completed',
                'message' => 'Nourriture récupérée chez mon fournisseur.',
                'donation_date' => now()->subDays(5),
            ],
            [
                'user_index' => 3,
                'type' => 'financial',
                'amount' => 200.00,
                'status' => 'pending',
                'message' => 'Don mensuel régulier.',
                'donation_date' => now()->subDays(1),
            ],
            [
                'user_index' => 4,
                'type' => 'material',
                'amount' => null,
                'item_description' => '3 couvertures, 2 paniers, jouets divers',
                'status' => 'completed',
                'message' => 'Matériel de confort pour les animaux.',
                'donation_date' => now()->subDays(3),
            ],
            [
                'user_index' => 5,
                'type' => 'financial',
                'amount' => 75.00,
                'status' => 'completed',
                'message' => 'Pour aider le refuge à continuer son beau travail.',
                'donation_date' => now()->subDays(20),
            ],
            [
                'user_index' => null,
                'type' => 'financial',
                'amount' => 25.00,
                'status' => 'completed',
                'message' => 'Don anonyme.',
                'donation_date' => now()->subDays(2),
            ],
        ];

        foreach ($donations as $data) {
            $user = $data['user_index'] !== null ? $users->get($data['user_index']) : null;

            Donation::create([
                'user_id' => $user?->id,
                'type' => $data['type'],
                'amount' => $data['amount'],
                'item_description' => $data['item_description'] ?? null,
                'status' => $data['status'],
                'message' => $data['message'],
                'donation_date' => $data['donation_date'],
            ]);
        }
    }
}
