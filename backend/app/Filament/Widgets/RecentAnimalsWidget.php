<?php

namespace App\Filament\Widgets;

use App\Models\Animal;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentAnimalsWidget extends BaseWidget
{
    protected static ?int $sort = 5;

    protected static bool $isLazy = false;

    protected int|string|array $columnSpan = [
        'default' => 'full',
        'xl' => 2,
    ];

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Animal::query()
                    ->latest()
                    ->limit(5)
            )
            ->columns([
                Tables\Columns\ImageColumn::make('photos')
                    ->label('')
                    ->square()
                    ->size(42),

                Tables\Columns\TextColumn::make('name')
                    ->label('Animal')
                    ->description(fn (Animal $record): string => trim(($record->breed ?: 'Race non renseignee') . ' - ' . match ($record->species) {
                        'dog' => 'Chien',
                        'cat' => 'Chat',
                        default => ucfirst((string) $record->species),
                    }))
                    ->searchable()
                    ->weight('font-semibold'),

                Tables\Columns\TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'available' => 'success',
                        'adopted' => 'info',
                        'in_care' => 'warning',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'available' => 'Disponible',
                        'adopted' => 'Adopte',
                        'in_care' => 'En soins',
                        default => $state,
                    }),
            ])
            ->heading('Nouveaux animaux')
            ->description('Dernieres fiches ajoutees')
            ->paginated(false);
    }
}
