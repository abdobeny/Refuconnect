<?php

namespace App\Filament\Resources\RaceCouplings;

use App\Filament\Resources\RaceCouplings\Pages;
use App\Models\RaceCoupling;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use BackedEnum;

class RaceCouplingResource extends Resource
{
    protected static ?string $model = RaceCoupling::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-arrow-path';
    protected static ?string $navigationLabel = 'Couplages de races';
    protected static ?string $pluralLabel = 'Couplages de races';
    protected static ?string $label = 'Couplage';

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->label('Demandeur')
                    ->relationship('user', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),

                Forms\Components\Select::make('animal_male_id')
                    ->label('Animal mâle')
                    ->relationship('animalMale', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),

                Forms\Components\Select::make('animal_female_id')
                    ->label('Animal femelle')
                    ->relationship('animalFemale', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),

                Forms\Components\TextInput::make('price')
                    ->label('Tarif (DH)')
                    ->numeric()
                    ->required()
                    ->prefix('DH')
                    ->default(300),

                Forms\Components\Select::make('status')
                    ->label('Statut')
                    ->options([
                        'en_attente' => 'En attente',
                        'validée'    => 'Validée',
                        'refusée'    => 'Refusée',
                        'terminée'   => 'Terminée',
                    ])
                    ->required()
                    ->default('en_attente')
                    ->live(),

                Forms\Components\Select::make('payment_status')
                    ->label('Statut du paiement')
                    ->options([
                        'non_payé'   => 'Non payé',
                        'payé'       => 'Payé',
                        'en_cours'   => 'En cours',
                    ])
                    ->default('non_payé'),

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
                    ->label('Demandeur')
                    ->searchable(),

                Tables\Columns\TextColumn::make('animalMale.name')
                    ->label('Mâle'),

                Tables\Columns\TextColumn::make('animalFemale.name')
                    ->label('Femelle'),

                Tables\Columns\TextColumn::make('price')
                    ->label('Tarif')
                    ->money('MAD')
                    ->alignRight(),

                Tables\Columns\TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'en_attente' => 'warning',
                        'validée'    => 'success',
                        'refusée'    => 'danger',
                        'terminée'   => 'info',
                        default      => 'gray',
                    }),

                Tables\Columns\TextColumn::make('payment_status')
                    ->label('Paiement')
                    ->badge(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date de demande')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status'),
                Tables\Filters\SelectFilter::make('payment_status'),
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
            'index' => Pages\ListRaceCouplings::route('/'),
            'create' => Pages\CreateRaceCoupling::route('/create'),
            'edit' => Pages\EditRaceCoupling::route('/{record}/edit'),
        ];
    }
}