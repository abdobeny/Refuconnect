<?php

namespace Tests\Feature\Api;

use App\Models\User;
use App\Models\Donation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
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

    public function test_public_stats_exposes_financial_donation_pledges(): void
    {
        $user = User::factory()->create();

        Donation::create([
            'user_id' => $user->id,
            'type' => 'financial',
            'amount' => 150,
            'status' => 'pending',
            'donation_date' => now(),
        ]);

        Donation::create([
            'user_id' => $user->id,
            'type' => 'material',
            'item_description' => 'Couvertures',
            'status' => 'pending',
            'donation_date' => now(),
        ]);

        $response = $this->getJson('/api/public-stats');

        $response->assertOk()
            ->assertJsonPath('donations_count', 2)
            ->assertJsonPath('donations_pledged', 150)
            ->assertJsonPath('donations_confirmed', 0);
    }

    public function test_user_can_create_paypal_order_for_financial_donation(): void
    {
        config([
            'services.paypal.client_id' => 'client-id',
            'services.paypal.client_secret' => 'client-secret',
            'services.paypal.sandbox_url' => 'https://api-m.sandbox.paypal.com',
        ]);

        Http::fake([
            'api-m.sandbox.paypal.com/v1/oauth2/token' => Http::response([
                'access_token' => 'paypal-token',
            ]),
            'api-m.sandbox.paypal.com/v2/checkout/orders' => Http::response([
                'id' => 'ORDER-123',
                'links' => [
                    ['rel' => 'approve', 'href' => 'https://paypal.test/checkout/ORDER-123'],
                ],
            ], 201),
        ]);

        Sanctum::actingAs(User::factory()->create());

        $response = $this->postJson('/api/donations/paypal-orders', [
            'amount' => 250,
            'message' => 'For urgent care',
        ]);

        $response->assertCreated()
            ->assertJsonPath('paypal_order_id', 'ORDER-123')
            ->assertJsonPath('approval_url', 'https://paypal.test/checkout/ORDER-123')
            ->assertJsonPath('donation.status', 'pending');

        $this->assertDatabaseHas('donations', [
            'amount' => 250,
            'payment_method' => 'paypal',
            'paypal_order_id' => 'ORDER-123',
            'status' => 'pending',
        ]);
    }

    public function test_user_can_capture_completed_paypal_order(): void
    {
        config([
            'services.paypal.client_id' => 'client-id',
            'services.paypal.client_secret' => 'client-secret',
            'services.paypal.sandbox_url' => 'https://api-m.sandbox.paypal.com',
        ]);

        Http::fake([
            'api-m.sandbox.paypal.com/v1/oauth2/token' => Http::response([
                'access_token' => 'paypal-token',
            ]),
            'api-m.sandbox.paypal.com/v2/checkout/orders/ORDER-123/capture' => Http::response([
                'status' => 'COMPLETED',
                'payer' => ['payer_id' => 'PAYER-123'],
                'purchase_units' => [[
                    'payments' => [
                        'captures' => [[
                            'id' => 'CAPTURE-123',
                        ]],
                    ],
                ]],
            ]),
        ]);

        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $donation = Donation::create([
            'user_id' => $user->id,
            'type' => 'financial',
            'amount' => 250,
            'payment_method' => 'paypal',
            'paypal_order_id' => 'ORDER-123',
            'status' => 'pending',
            'donation_date' => now(),
        ]);

        $response = $this->postJson("/api/donations/{$donation->id}/capture-paypal");

        $response->assertOk()
            ->assertJsonPath('data.status', 'completed')
            ->assertJsonPath('data.paypal_capture_id', 'CAPTURE-123');

        $this->assertDatabaseHas('donations', [
            'id' => $donation->id,
            'status' => 'completed',
            'paypal_capture_id' => 'CAPTURE-123',
            'paypal_payer_id' => 'PAYER-123',
        ]);
    }
}
