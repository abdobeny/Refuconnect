<?php

namespace App\Filament\Widgets;

use App\Models\Adoption;
use App\Models\Animal;
use App\Models\CouplingRequest;
use App\Models\Donation;
use App\Models\GroomingReservation;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Cache;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected int|string|array $columnSpan = 'full';

    protected function getColumns(): int
    {
        return 4;
    }

    protected function getStats(): array
    {
        $stats = Cache::remember('filament.dashboard.stats', 60, function () {
            return [
                'animals_available' => Animal::where('status', 'available')->count(),
                'adoptions_pending' => Adoption::where('status', 'pending')->count(),
                'donations_month' => Donation::query()
                    ->where('type', 'financial')
                    ->whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year)
                    ->sum('amount'),
                'requests_active' => GroomingReservation::where('status', 'pending')->count()
                    + CouplingRequest::where('status', 'pending')->count(),
            ];
        });

        return [
            Stat::make('Animaux disponibles', $stats['animals_available'])
                ->description("Prêts à l'adoption")
                ->descriptionIcon('heroicon-m-home')
                ->color('success'),

            Stat::make('Adoptions en attente', $stats['adoptions_pending'])
                ->description('À traiter')
                ->descriptionIcon('heroicon-m-heart')
                ->color('warning'),

            Stat::make('Dons ce mois', number_format($stats['donations_month'], 0).' DH')
                ->description('Engagements financiers')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('primary'),

            Stat::make('Demandes actives', $stats['requests_active'])
                ->description('Toilettage & couplage')
                ->descriptionIcon('heroicon-m-inbox')
                ->color('gray'),
        ];
    }
}
