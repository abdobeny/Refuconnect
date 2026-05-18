<?php

namespace Tests\Feature\Api;

use App\Models\Animal;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AnimalTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_index_only_returns_available_animals(): void
    {
        Animal::create([
            'name' => 'Available',
            'species' => 'dog',
            'breed' => 'Labrador',
            'sex' => 'male',
            'status' => 'available',
        ]);

        Animal::create([
            'name' => 'Adopted',
            'species' => 'cat',
            'breed' => 'Siamois',
            'sex' => 'female',
            'status' => 'adopted',
        ]);

        $response = $this->getJson('/api/animals');

        $response->assertOk();
        $this->assertCount(1, $response->json('data'));
        $this->assertSame('Available', $response->json('data.0.name'));
    }

    public function test_animals_can_be_filtered_by_species(): void
    {
        Animal::create([
            'name' => 'Dog',
            'species' => 'dog',
            'breed' => 'Labrador',
            'sex' => 'male',
            'status' => 'available',
        ]);

        Animal::create([
            'name' => 'Cat',
            'species' => 'cat',
            'breed' => 'European',
            'sex' => 'female',
            'status' => 'available',
        ]);

        $response = $this->getJson('/api/animals?species=cat');

        $response->assertOk();
        $this->assertCount(1, $response->json('data'));
        $this->assertSame('cat', $response->json('data.0.species'));
    }
}
