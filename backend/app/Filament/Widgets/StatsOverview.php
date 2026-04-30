<?php

namespace App\Filament\Widgets;

use App\Models\Adoption;
use App\Models\Animal;
use App\Models\Donation;
use App\Models\GroomingReservation;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Animaux disponibles', Animal::where('statut', 'disponible')->count())
                ->description('En attente d\'adoption')
                ->descriptionIcon('heroicon-m-home')  // Changed from paw-print
                ->color('success'),

            Stat::make('Adoptions ce mois', Adoption::whereMonth('created_at', now()->month)->count())
                ->description('Demandes d\'adoption')
                ->descriptionIcon('heroicon-m-heart')
                ->color('info'),

            // Fixed: use 'montant' instead of 'amount', and 'type' = 'financier' instead of 'status'
            Stat::make('Dons reçus', number_format(Donation::where('type', 'financier')->sum('montant'), 2) . ' DH')
                ->description('Total des dons financiers')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('warning'),

            Stat::make('Réservations toilettage', GroomingReservation::where('statut', 'confirmé')->count())
                ->description('Réservations confirmées')
                ->descriptionIcon('heroicon-m-scissors')
                ->color('primary'),
        ];
    }
}