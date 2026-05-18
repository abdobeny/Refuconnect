<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CouplingRequestTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_submit_coupling_request(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $response = $this->postJson('/api/coupling-requests', [
            'contact_phone' => '0612345678',
            'pet_species' => 'dog',
            'pet_breed' => 'Berger Allemand',
            'pet_sex' => 'male',
            'pet_age' => '2 ans',
            'vaccinated' => 'yes',
            'health_status' => 'good',
            'preferred_breed' => 'Berger Allemand',
            'message' => 'Looking for a calm partner',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.status', 'pending')
            ->assertJsonPath('data.pet_breed', 'Berger Allemand');
    }
}
