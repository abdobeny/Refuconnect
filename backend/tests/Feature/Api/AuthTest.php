<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_and_receive_token(): void
    {
        User::factory()->create([
            'email' => 'user@example.com',
            'password' => Hash::make('password123'),
            'role' => 'utilisateur',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'user@example.com',
            'password' => 'password123',
        ]);

        $response->assertOk()
            ->assertJsonStructure(['token', 'user' => ['id', 'name', 'email', 'role']])
            ->assertJsonPath('user.role', 'user');
    }

    public function test_login_with_invalid_credentials_returns_401(): void
    {
        $response = $this->postJson('/api/login', [
            'email' => 'missing@example.com',
            'password' => 'wrong',
        ]);

        $response->assertUnauthorized();
    }
}
