<?php

namespace Tests\Feature\Api;

use App\Models\Adoption;
use App\Models\Animal;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdoptionTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_cannot_request_adoption_for_unavailable_animal(): void
    {
        $user = User::factory()->create();
        $animal = Animal::create([
            'name' => 'Bella',
            'species' => 'dog',
            'breed' => 'Golden',
            'sex' => 'female',
            'status' => 'adopted',
        ]);

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/adoptions', [
            'animal_id' => $animal->id,
            'motivation' => 'I love dogs',
        ]);

        $response->assertStatus(422);
    }

    public function test_user_cannot_create_duplicate_pending_adoption(): void
    {
        $user = User::factory()->create();
        $animal = Animal::create([
            'name' => 'Max',
            'species' => 'dog',
            'breed' => 'Labrador',
            'sex' => 'male',
            'status' => 'available',
        ]);

        Adoption::create([
            'user_id' => $user->id,
            'animal_id' => $animal->id,
            'status' => 'pending',
            'requested_at' => now(),
        ]);

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/adoptions', [
            'animal_id' => $animal->id,
            'motivation' => 'Second try',
        ]);

        $response->assertStatus(422);
    }

    public function test_approving_adoption_marks_animal_as_adopted(): void
    {
        $animal = Animal::create([
            'name' => 'Luna',
            'species' => 'cat',
            'breed' => 'Siamois',
            'sex' => 'female',
            'status' => 'available',
        ]);

        $adoption = Adoption::create([
            'user_id' => User::factory()->create()->id,
            'animal_id' => $animal->id,
            'status' => 'pending',
            'requested_at' => now(),
        ]);

        $adoption->update(['status' => 'approved']);

        $this->assertSame('adopted', $animal->fresh()->status);
    }
}
