<?php

namespace App\Filament\Widgets;

use App\Models\Adoption;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentAdoptions extends BaseWidget
{
    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Adoption::query()
                    ->with(['user', 'animal'])
                    ->latest()
                    ->limit(5)
            )
            ->columns([
                Tables\Columns\TextColumn::make('animal.nom')
                    ->label('Animal')
                    ->searchable(),

                Tables\Columns\TextColumn::make('user.name')
                    ->label('Adoptant')
                    ->searchable(),

                Tables\Columns\TextColumn::make('statut')
                    ->label('Statut')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'en_attente' => 'warning',
                        'validée' => 'success',
                        'refusée' => 'danger',
                        default => 'gray',
                    }),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->heading('Dernières demandes d\'adoption')
            ->paginated(false);
    }
}
