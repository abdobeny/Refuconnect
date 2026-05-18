<?php

namespace App\Filament\Widgets;

use App\Models\Animal;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentAnimalsWidget extends BaseWidget
{
    protected int|string|array $columnSpan = 'full';

    protected static ?int $sort = 3;

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
                    ->label('Photo')
                    ->square()
                    ->size(40),

                Tables\Columns\TextColumn::make('name')
                    ->label('Nom')
                    ->searchable()
                    ->weight('font-semibold'),

                Tables\Columns\TextColumn::make('species')
                    ->label('Espèce')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'dog' => 'primary',
                        'cat' => 'info',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'dog' => 'Chien',
                        'cat' => 'Chat',
                        default => $state,
                    }),

                Tables\Columns\TextColumn::make('breed')
                    ->label('Race')
                    ->searchable(),

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
                        'adopted' => 'Adopté',
                        'in_care' => 'En soins',
                        default => $state,
                    }),

                Tables\Columns\IconColumn::make('vaccinated')
                    ->label('Vacciné')
                    ->boolean(),

                Tables\Columns\IconColumn::make('sterilized')
                    ->label('Stérilisé')
                    ->boolean(),

                Tables\Columns\TextColumn::make('health_status')
                    ->label('Santé')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'good' => 'success',
                        'fair' => 'warning',
                        'critical' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'good' => 'Bon',
                        'fair' => 'Moyen',
                        'critical' => 'Critique',
                        default => $state,
                    }),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Ajouté le')
                    ->dateTime('d/m/Y')
                    ->sortable(),
            ])
            ->heading('Animaux récemment ajoutés')
            ->paginated(false);
    }
}
