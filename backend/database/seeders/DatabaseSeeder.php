<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            AnimalSeeder::class,
            AdoptionSeeder::class,
            GroomingReservationSeeder::class,
            DonationSeeder::class,
            CouplingRequestSeeder::class,
            VolunteerApplicationSeeder::class,
            TestimonialSeeder::class,
        ]);
    }
}
