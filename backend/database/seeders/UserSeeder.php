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
            ['name' => 'Ahmed Bennani', 'email' => 'ahmed@refuconnect.ma'],
            ['name' => 'Fatima Tahir', 'email' => 'fatima@refuconnect.ma'],
            ['name' => 'Karim El Mansouri', 'email' => 'karim@refuconnect.ma'],
            ['name' => 'Zahra Hassi', 'email' => 'zahra@refuconnect.ma'],
            ['name' => 'Youssef Alami', 'email' => 'youssef@refuconnect.ma'],
            ['name' => 'Aisha Bouazza', 'email' => 'aisha@refuconnect.ma'],
            ['name' => 'Mohamed Anwar', 'email' => 'mohamed@refuconnect.ma'],
            ['name' => 'Yasmin Rizki', 'email' => 'yasmin@refuconnect.ma'],
            ['name' => 'Khalid Rachid', 'email' => 'khalid@refuconnect.ma'],
            ['name' => 'Salma Zaki', 'email' => 'salma@refuconnect.ma'],
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
