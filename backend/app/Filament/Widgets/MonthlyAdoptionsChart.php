<?php

namespace App\Filament\Widgets;

use App\Models\Adoption;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;

class MonthlyAdoptionsChart extends ChartWidget
{
    protected ?string $heading = 'Demandes d\'adoption';

    protected ?string $description = 'Evolution sur les 6 derniers mois';

    protected int|string|array $columnSpan = [
        'default' => 'full',
        'xl' => 4,
    ];

    protected static ?int $sort = 3;

    protected static bool $isLazy = false;

    protected ?string $pollingInterval = null;

    protected function getData(): array
    {
        $data = [];
        $labels = [];

        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $labels[] = $month->translatedFormat('M');

            $data[] = Adoption::whereMonth('created_at', $month->month)
                ->whereYear('created_at', $month->year)
                ->count();
        }

        return [
            'datasets' => [
                [
                    'label' => 'Demandes',
                    'data' => $data,
                    'backgroundColor' => 'rgba(92, 122, 107, 0.14)',
                    'borderColor' => '#5C7A6B',
                    'borderWidth' => 3,
                    'fill' => true,
                    'tension' => 0.38,
                    'pointBackgroundColor' => '#A9795F',
                    'pointBorderColor' => '#FFFDF9',
                    'pointBorderWidth' => 3,
                    'pointRadius' => 5,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => ['display' => false],
            ],
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                    'ticks' => ['stepSize' => 1],
                    'grid' => ['color' => 'rgba(120, 109, 100, 0.13)', 'drawBorder' => false],
                ],
                'x' => [
                    'grid' => ['display' => false],
                ],
            ],
            'maintainAspectRatio' => false,
        ];
    }
}
