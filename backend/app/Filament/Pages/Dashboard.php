<?php

namespace App\Filament\Pages;

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
        return 'Vue d’ensemble du refuge — ' . now()->translatedFormat('d F Y');
    }
}
