<?php

namespace App\Filament\Widgets;

use App\Models\Animal;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\Cache;

class AnimalStatusChart extends ChartWidget
{
    protected ?string $heading = 'Animaux par statut';

    protected ?string $description = "Vue d'ensemble du refuge";

    protected int|string|array $columnSpan = 1;

    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $counts = Cache::remember('filament.dashboard.animal-status', 60, function () {
            return [
                'available' => Animal::where('status', 'available')->count(),
                'adopted' => Animal::where('status', 'adopted')->count(),
                'in_care' => Animal::where('status', 'in_care')->count(),
            ];
        });

        return [
            'datasets' => [
                [
                    'data' => [$counts['available'], $counts['adopted'], $counts['in_care']],
                    'backgroundColor' => ['#5C7A6B', '#2F3634', '#A9795F'],
                    'borderWidth' => 0,
                ],
            ],
            'labels' => ['Disponibles', 'Adoptés', 'En soins'],
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'position' => 'bottom',
                    'labels' => [
                        'usePointStyle' => true,
                        'padding' => 16,
                        'font' => ['family' => 'Inter', 'size' => 11],
                    ],
                ],
            ],
            'cutout' => '68%',
            'maintainAspectRatio' => true,
        ];
    }
}
