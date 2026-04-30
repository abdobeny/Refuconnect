<?php

namespace App\Filament\Resources\GroomingReservations;

use App\Filament\Resources\GroomingReservations\Pages;
use App\Models\GroomingReservation;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use BackedEnum;

class GroomingReservationResource extends Resource
{
    protected static ?string $model = GroomingReservation::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-scissors';
    protected static ?string $navigationLabel = 'Réservations Toilettage';
    protected static ?string $pluralLabel = 'Réservations de toilettage';
    protected static ?string $label = 'Réservation de toilettage';

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->label('Client')
                    ->relationship('user', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),

                Forms\Components\Select::make('animal_id')
                    ->label('Animal')
                    ->relationship('animal', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),

                Forms\Components\Select::make('service_type')
                    ->label('Type de service')
                    ->options([
                        'bain'        => 'Bain',
                        'tonte'       => 'Tonte',
                        'nettoyage'   => 'Nettoyage complet',
                        'bain_tonte'  => 'Bain + Tonte',
                        'autre'       => 'Autre',
                    ])
                    ->required(),

                Forms\Components\DateTimePicker::make('reservation_date')
                    ->label('Date et heure de réservation')
                    ->required()
                    ->native(false),

                Forms\Components\Select::make('status')
                    ->label('Statut')
                    ->options([
                        'en_attente' => 'En attente',
                        'confirmée'  => 'Confirmée',
                        'terminée'   => 'Terminée',
                        'annulée'    => 'Annulée',
                    ])
                    ->required()
                    ->default('en_attente')
                    ->live(),

                Forms\Components\Textarea::make('notes')
                    ->label('Notes / Observations')
                    ->columnSpanFull(),
            ])
            ->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Client')
                    ->searchable(),

                Tables\Columns\TextColumn::make('animal.name')
                    ->label('Animal')
                    ->searchable(),

                Tables\Columns\TextColumn::make('service_type')
                    ->label('Service')
                    ->badge(),

                Tables\Columns\TextColumn::make('reservation_date')
                    ->label('Date & Heure')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),

                Tables\Columns\TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'en_attente' => 'warning',
                        'confirmée'  => 'success',
                        'terminée'   => 'info',
                        'annulée'    => 'danger',
                        default      => 'gray',
                    }),
            ])
            ->defaultSort('reservation_date', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status'),
                Tables\Filters\SelectFilter::make('service_type'),
            ])
            ->actions([
                EditAction::make(),
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListGroomingReservations::route('/'),
            'create' => Pages\CreateGroomingReservation::route('/create'),
            'edit' => Pages\EditGroomingReservation::route('/{record}/edit'),
        ];
    }
}