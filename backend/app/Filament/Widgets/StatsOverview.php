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

    protected static bool $isLazy = false;

    protected int|string|array $columnSpan = 'full';

    protected function getColumns(): int
    {
        return 4;
    }

    protected function getStats(): array
    {
        $animalsAvailable = Animal::where('status', 'available')->count();
        $animalsInCare = Animal::where('status', 'in_care')->count();
        $adoptionsPending = Adoption::where('status', 'pending')->count();
        $adoptionsApproved = Adoption::where('status', 'approved')->count();
        $donationsMonth = Donation::query()
            ->where('type', 'financial')
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('amount');
        $serviceRequests = GroomingReservation::where('status', 'pending')->count()
            + CouplingRequest::where('status', 'pending')->count();

        return [
            Stat::make('Animaux adoptables', $animalsAvailable)
                ->description($animalsInCare . ' en soins a suivre')
                ->descriptionIcon('heroicon-m-heart')
                ->chart([2, 4, 4, 6, 5, 7, $animalsAvailable])
                ->color('success'),

            Stat::make('Adoptions a traiter', $adoptionsPending)
                ->description($adoptionsApproved . ' dossiers approuves')
                ->descriptionIcon('heroicon-m-clock')
                ->chart([1, 3, 2, 4, 3, 5, $adoptionsPending])
                ->color($adoptionsPending > 0 ? 'warning' : 'success'),

            Stat::make('Dons du mois', number_format($donationsMonth, 0) . ' DH')
                ->description('Promesses financieres recues')
                ->descriptionIcon('heroicon-m-banknotes')
                ->chart([120, 180, 260, 220, 340, 390, max((int) $donationsMonth, 1)])
                ->color('primary'),

            Stat::make('Services actifs', $serviceRequests)
                ->description('Toilettage et couplage')
                ->descriptionIcon('heroicon-m-inbox-stack')
                ->chart([0, 1, 1, 2, 2, 3, $serviceRequests])
                ->color('info'),
        ];
    }
}
