<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class DonationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_financial_donation_without_payment_method(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $response = $this->postJson('/api/donations', [
            'type' => 'financial',
            'amount' => 100,
            'message' => 'Thank you for your work',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.type', 'financial')
            ->assertJsonPath('data.status', 'pending');

        $this->assertDatabaseHas('donations', [
            'type' => 'financial',
            'status' => 'pending',
        ]);
    }
}
