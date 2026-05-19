<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\AnimalStatusChart;
use App\Filament\Widgets\MonthlyAdoptionsChart;
use App\Filament\Widgets\RecentAdoptions;
use App\Filament\Widgets\RecentAnimalsWidget;
use App\Filament\Widgets\StatsOverview;
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    protected static ?string $navigationLabel = 'Tableau de bord';

    protected static ?int $navigationSort = -2;

    public function getTitle(): string
    {
        return 'Tableau de bord';
    }

    public function getHeading(): string
    {
        return 'Tableau de bord';
    }

    public function getSubheading(): ?string
    {
        return 'Pilotage du refuge, demandes a traiter et activite recente - ' . now()->translatedFormat('d F Y');
    }

    public function getColumns(): array|int
    {
        return [
            'default' => 1,
            'lg' => 2,
            'xl' => 6,
        ];
    }

    public function getWidgets(): array
    {
        return [
            StatsOverview::class,
            AnimalStatusChart::class,
            MonthlyAdoptionsChart::class,
            RecentAdoptions::class,
            RecentAnimalsWidget::class,
        ];
    }
}
