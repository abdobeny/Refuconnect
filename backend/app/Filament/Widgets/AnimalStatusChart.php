<?php

namespace App\Filament\Widgets;

use App\Models\Animal;
use Filament\Widgets\ChartWidget;

class AnimalStatusChart extends ChartWidget
{
    protected ?string $heading = 'Repartition des animaux';

    protected ?string $description = 'Disponibilite actuelle du refuge';

    protected int|string|array $columnSpan = [
        'default' => 'full',
        'xl' => 2,
    ];

    protected static ?int $sort = 2;

    protected static bool $isLazy = false;

    protected ?string $pollingInterval = null;

    protected function getData(): array
    {
        $available = Animal::where('status', 'available')->count();
        $adopted = Animal::where('status', 'adopted')->count();
        $inCare = Animal::where('status', 'in_care')->count();

        return [
            'datasets' => [
                [
                    'label' => 'Animaux',
                    'data' => [$available, $adopted, $inCare],
                    'backgroundColor' => ['#5C7A6B', '#A9795F', '#2F3634'],
                    'borderColor' => '#FFFDF9',
                    'borderWidth' => 5,
                    'hoverOffset' => 8,
                ],
            ],
            'labels' => ['Disponibles', 'Adoptes', 'En soins'],
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
                        'boxWidth' => 8,
                        'padding' => 18,
                        'font' => ['family' => 'Inter', 'size' => 12, 'weight' => 600],
                    ],
                ],
            ],
            'cutout' => '64%',
            'maintainAspectRatio' => false,
        ];
    }
}
