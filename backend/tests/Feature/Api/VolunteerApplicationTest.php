<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class VolunteerApplicationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_submit_volunteer_application(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $response = $this->postJson('/api/volunteer-applications', [
            'name' => 'Sara Benali',
            'email' => 'sara@example.com',
            'phone' => '0612345678',
            'message' => 'Disponible samedi matin pour promenades.',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.status', 'pending')
            ->assertJsonPath('data.email', 'sara@example.com');

        $this->assertDatabaseHas('volunteer_applications', [
            'email' => 'sara@example.com',
            'status' => 'pending',
        ]);
    }

    public function test_volunteer_application_requires_name_and_email(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $response = $this->postJson('/api/volunteer-applications', [
            'message' => 'Je veux aider.',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'email']);
    }
}
