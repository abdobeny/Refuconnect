<?php

namespace App\Services;

use App\Models\Donation;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use RuntimeException;

class PayPalService
{
    public function createOrder(Donation $donation): array
    {
        $response = $this->client()->post('/v2/checkout/orders', [
            'intent' => 'CAPTURE',
            'purchase_units' => [[
                'reference_id' => (string) $donation->id,
                'custom_id' => (string) $donation->id,
                'description' => 'Don RefuConnect #' . $donation->id,
                'amount' => [
                    'currency_code' => $this->currency(),
                    'value' => number_format((float) $donation->amount, 2, '.', ''),
                ],
            ]],
            'application_context' => [
                'brand_name' => config('app.name', 'RefuConnect'),
                'shipping_preference' => 'NO_SHIPPING',
                'user_action' => 'PAY_NOW',
                'return_url' => $this->frontendUrl('/dons?paypal=success&donation_id=' . $donation->id),
                'cancel_url' => $this->frontendUrl('/dons?paypal=cancel&donation_id=' . $donation->id),
            ],
        ]);

        if (! $response->successful()) {
            throw new RuntimeException('Impossible de créer le paiement PayPal.');
        }

        return $response->json();
    }

    public function captureOrder(string $orderId): array
    {
        $response = $this->client()->post("/v2/checkout/orders/{$orderId}/capture");

        if (! $response->successful()) {
            throw new RuntimeException('Impossible de confirmer le paiement PayPal.');
        }

        return $response->json();
    }

    private function client(): PendingRequest
    {
        return Http::withToken($this->accessToken())
            ->baseUrl($this->baseUrl())
            ->acceptJson()
            ->asJson()
            ->timeout(20);
    }

    private function accessToken(): string
    {
        $clientId = config('services.paypal.client_id');
        $clientSecret = config('services.paypal.client_secret');

        if (! $clientId || ! $clientSecret) {
            throw new RuntimeException('Les identifiants PayPal ne sont pas configurés.');
        }

        $response = Http::withBasicAuth($clientId, $clientSecret)
            ->baseUrl($this->baseUrl())
            ->asForm()
            ->acceptJson()
            ->timeout(20)
            ->post('/v1/oauth2/token', [
                'grant_type' => 'client_credentials',
            ]);

        if (! $response->successful() || ! $response->json('access_token')) {
            throw new RuntimeException('Impossible de se connecter à PayPal.');
        }

        return $response->json('access_token');
    }

    private function baseUrl(): string
    {
        return config('services.paypal.mode') === 'live'
            ? config('services.paypal.live_url')
            : config('services.paypal.sandbox_url');
    }

    private function currency(): string
    {
        return Str::upper(config('services.paypal.currency', 'MAD'));
    }

    private function frontendUrl(string $path): string
    {
        return rtrim(config('app.frontend_url'), '/') . $path;
    }
}
