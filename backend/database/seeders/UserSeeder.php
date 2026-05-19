<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@refuconnect.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // Test users with diverse profiles
        $users = [
            ['name' => 'Jean Dupont', 'email' => 'jean@example.com'],
            ['name' => 'Marie Martin', 'email' => 'marie@example.com'],
            ['name' => 'Pierre Durand', 'email' => 'pierre@example.com'],
            ['name' => 'Sophie Bernard', 'email' => 'sophie@example.com'],
            ['name' => 'Lucas Petit', 'email' => 'lucas@example.com'],
            ['name' => 'Amina Khelifi', 'email' => 'amina@example.com'],
            ['name' => 'Thomas Moreau', 'email' => 'thomas@example.com'],
            ['name' => 'Léa Rousseau', 'email' => 'lea@example.com'],
            ['name' => 'Hassan Benali', 'email' => 'hassan@example.com'],
            ['name' => 'Claire Fontaine', 'email' => 'claire@example.com'],
        ];

        foreach ($users as $user) {
            User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make('password123'),
                'role' => 'utilisateur',
            ]);
        }
    }
}
