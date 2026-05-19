<?php

namespace App\Filament\Widgets;

use App\Models\Adoption;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentAdoptions extends BaseWidget
{
    protected static ?int $sort = 4;

    protected static bool $isLazy = false;

    protected int|string|array $columnSpan = [
        'default' => 'full',
        'xl' => 4,
    ];

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Adoption::query()
                    ->with(['user', 'animal'])
                    ->latest()
                    ->limit(6)
            )
            ->columns([
                Tables\Columns\TextColumn::make('animal.name')
                    ->label('Animal')
                    ->placeholder('Animal non renseigne')
                    ->searchable()
                    ->weight('font-semibold'),

                Tables\Columns\TextColumn::make('user.name')
                    ->label('Adoptant')
                    ->placeholder('Compte sans nom')
                    ->description(fn (Adoption $record): ?string => $record->user?->email)
                    ->searchable(),

                Tables\Columns\TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'A traiter',
                        'approved' => 'Approuvee',
                        'rejected' => 'Refusee',
                        default => ucfirst($state),
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'approved' => 'success',
                        'rejected' => 'danger',
                        default => 'gray',
                    }),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Recue le')
                    ->since()
                    ->sortable(),
            ])
            ->heading('Demandes recentes')
            ->description('Les dossiers les plus recents a suivre')
            ->paginated(false);
    }
}
