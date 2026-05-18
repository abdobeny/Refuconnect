<?php

namespace App\Filament\Widgets;

use App\Models\Adoption;
use App\Models\Animal;
use App\Models\CouplingRequest;
use App\Models\Donation;
use App\Models\GroomingReservation;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected int|string|array $columnSpan = 'full';

    protected function getStats(): array
    {
        $adoptionsPending = Adoption::where('status', 'pending')->count();
        $donationsMonth = Donation::query()
            ->where('type', 'financial')
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('amount');

        return [
            Stat::make('Animaux disponibles', Animal::where('status', 'available')->count())
                ->description('Prêts à l’adoption')
                ->descriptionIcon('heroicon-m-home')
                ->color('success'),

            Stat::make('Adoptions en attente', $adoptionsPending)
                ->description('À traiter')
                ->descriptionIcon('heroicon-m-heart')
                ->color('warning'),

            Stat::make('Dons ce mois', number_format($donationsMonth, 0).' DH')
                ->description('Engagements financiers')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('primary'),

            Stat::make('Demandes actives', GroomingReservation::where('status', 'pending')->count()
                + CouplingRequest::where('status', 'pending')->count())
                ->description('Toilettage & couplage')
                ->descriptionIcon('heroicon-m-inbox')
                ->color('gray'),
        ];
    }
}
