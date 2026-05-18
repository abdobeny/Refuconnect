<?php

namespace App\Filament\Widgets;

use App\Models\Adoption;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;

class MonthlyAdoptionsChart extends ChartWidget
{
    protected ?string $heading = 'Adoptions par mois';
    
    protected ?string $description = 'Tendance des demandes d\'adoption (6 derniers mois)';
    
    protected int|string|array $columnSpan = 2;

    protected function getData(): array
    {
        $data = [];
        $labels = [];
        
        // Get data for last 6 months
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $labels[] = $month->format('M Y');
            
            $count = Adoption::whereMonth('created_at', $month->month)
                ->whereYear('created_at', $month->year)
                ->count();
            $data[] = $count;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Adoptions',
                    'data' => $data,
                    'backgroundColor' => 'rgba(245, 158, 11, 0.2)',
                    'borderColor' => '#f59e0b',
                    'borderWidth' => 2,
                    'fill' => true,
                    'tension' => 0.4,
                    'pointBackgroundColor' => '#f59e0b',
                    'pointBorderColor' => '#fff',
                    'pointBorderWidth' => 2,
                    'pointRadius' => 4,
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
                'legend' => [
                    'display' => false,
                ],
            ],
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                    'ticks' => [
                        'stepSize' => 1,
                    ],
                    'grid' => [
                        'display' => true,
                        'drawBorder' => false,
                    ],
                ],
                'x' => [
                    'grid' => [
                        'display' => false,
                    ],
                ],
            ],
            'responsive' => true,
            'maintainAspectRatio' => true,
        ];
    }
}
