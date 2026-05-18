<?php

namespace App\Filament\Resources\GroomingReservations\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class GroomingReservationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('Client')
                    ->searchable(),

                TextColumn::make('pet_name')
                    ->label('Animal')
                    ->searchable(),

                TextColumn::make('pet_type')
                    ->label('Type')
                    ->badge(),

                TextColumn::make('reservation_date')
                    ->label('Date & Heure')
                    ->dateTime()
                    ->sortable(),

                TextColumn::make('service_type')
                    ->label('Service')
                    ->badge(),

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