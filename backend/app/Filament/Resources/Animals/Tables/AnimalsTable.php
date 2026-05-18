<?php

namespace App\Filament\Resources\Animals\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class AnimalsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('photos')
                    ->label('Photo')
                    ->square(),

                TextColumn::make('name')
                    ->label('Nom')
                    ->searchable(),

                TextColumn::make('species')
                    ->label('Espèce')
                    ->badge(),

                TextColumn::make('breed')
                    ->label('Race')
                    ->searchable(),

                TextColumn::make('age')
                    ->label('Âge')
                    ->numeric()
                    ->sortable(),

                TextColumn::make('sex')
                    ->label('Sexe')
                    ->badge(),

                TextColumn::make('sterilized')
                    ->label('Stérilisé')
                    ->boolean(),

                TextColumn::make('health_status')
                    ->label('Santé')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'good' => 'success',
                        'fair' => 'warning',
                        'critical' => 'danger',
                        default => 'gray',
                    }),

                TextColumn::make('status')
                    ->label('Statut')
                    ->badge(),

                TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->label('Modifié le')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}