<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class GroomingReservationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_request_grooming_reservation(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $response = $this->postJson('/api/grooming', [
            'service_type' => 'full_grooming',
            'reservation_date' => now()->addDays(2)->toIso8601String(),
            'pet_name' => 'Milo',
            'pet_type' => 'dog',
            'notes' => 'Peureux au séchage.',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.status', 'pending')
            ->assertJsonPath('data.pet_name', 'Milo');

        $this->assertDatabaseHas('grooming_reservations', [
            'pet_name' => 'Milo',
            'service_type' => 'full_grooming',
            'status' => 'pending',
        ]);
    }

    public function test_grooming_reservation_must_be_in_future(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $response = $this->postJson('/api/grooming', [
            'service_type' => 'bath',
            'reservation_date' => now()->subDay()->toIso8601String(),
            'pet_name' => 'Luna',
            'pet_type' => 'cat',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['reservation_date']);
    }
}
