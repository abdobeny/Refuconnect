<?php

namespace Database\Seeders;

use App\Models\GroomingReservation;
use App\Models\User;
use Illuminate\Database\Seeder;

class GroomingReservationSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('role', 'utilisateur')->get();

        $reservations = [
            [
                'user_index' => 0,
                'service_type' => 'bath',
                'reservation_date' => now()->addDays(3)->setTime(10, 0),
                'pet_name' => 'Rex',
                'pet_type' => 'dog',
                'status' => 'confirmed',
                'notes' => 'Chien très calme, pas de problème de comportement.',
            ],
            [
                'user_index' => 1,
                'service_type' => 'full_grooming',
                'reservation_date' => now()->addDays(5)->setTime(14, 0),
                'pet_name' => 'Minette',
                'pet_type' => 'cat',
                'status' => 'pending',
                'notes' => 'Chatte un peu stressée, approche douce nécessaire.',
            ],
            [
                'user_index' => 2,
                'service_type' => 'nail_trim',
                'reservation_date' => now()->addDays(2)->setTime(11, 0),
                'pet_name' => 'Buddy',
                'pet_type' => 'dog',
                'status' => 'completed',
                'notes' => null,
            ],
            [
                'user_index' => 3,
                'service_type' => 'haircut',
                'reservation_date' => now()->addDays(7)->setTime(9, 0),
                'pet_name' => 'Félix',
                'pet_type' => 'cat',
                'status' => 'pending',
                'notes' => 'Poils longs, emmêlés derrière les oreilles.',
            ],
            [
                'user_index' => 4,
                'service_type' => 'other',
                'reservation_date' => now()->addDays(4)->setTime(15, 0),
                'pet_name' => 'Lola',
                'pet_type' => 'dog',
                'status' => 'confirmed',
                'notes' => 'Chienne âgée, arthrose. Manipulation très douce.',
            ],
            [
                'user_index' => 5,
                'service_type' => 'bath',
                'reservation_date' => now()->addDays(6)->setTime(10, 30),
                'pet_name' => 'Simba',
                'pet_type' => 'cat',
                'status' => 'pending',
                'notes' => 'Premier bain, à surveiller.',
            ],
        ];

        foreach ($reservations as $data) {
            $user = $users->get($data['user_index']);

            if ($user) {
                GroomingReservation::create([
                    'user_id' => $user->id,
                    'service_type' => $data['service_type'],
                    'reservation_date' => $data['reservation_date'],
                    'pet_name' => $data['pet_name'],
                    'pet_type' => $data['pet_type'],
                    'status' => $data['status'],
                    'notes' => $data['notes'],
                ]);
            }
        }
    }
}
