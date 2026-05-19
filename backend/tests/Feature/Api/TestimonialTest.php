<?php

namespace Tests\Feature\Api;

use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class TestimonialTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_index_only_returns_approved_featured_testimonials(): void
    {
        Testimonial::create([
            'name' => 'Approved User',
            'role' => 'Adoptante',
            'quote' => 'Une expérience très claire et rassurante avec le refuge.',
            'status' => 'approved',
            'featured' => true,
            'sort_order' => 1,
        ]);

        Testimonial::create([
            'name' => 'Pending User',
            'role' => 'Bénévole',
            'quote' => 'Ce message ne doit pas être public pour le moment.',
            'status' => 'pending',
            'featured' => true,
            'sort_order' => 2,
        ]);

        $response = $this->getJson('/api/testimonials');

        $response->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.name', 'Approved User');
    }

    public function test_user_can_submit_testimonial_for_review(): void
    {
        Sanctum::actingAs(User::factory()->create(['name' => 'Mina']));

        $response = $this->postJson('/api/testimonials', [
            'role' => 'Donatrice',
            'quote' => 'Le suivi est clair et donne envie de continuer à soutenir le refuge.',
            'detail' => 'Don mensuel',
        ]);

        $response->assertCreated()
            ->assertJsonPath('testimonial.status', 'pending')
            ->assertJsonPath('testimonial.featured', false);

        $this->assertDatabaseHas('testimonials', [
            'name' => 'Mina',
            'status' => 'pending',
            'featured' => false,
        ]);
    }
}
