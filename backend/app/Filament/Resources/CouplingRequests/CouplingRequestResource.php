<?php

namespace App\Filament\Resources\CouplingRequests;

use App\Filament\Resources\CouplingRequests\Pages;
use App\Models\CouplingRequest;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class CouplingRequestResource extends Resource
{
    protected static ?string $model = CouplingRequest::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-heart';

    protected static ?string $navigationLabel = 'Couplage';

    protected static string | \UnitEnum | null $navigationGroup = 'Demandes';

    protected static ?int $navigationSort = 4;

    protected static ?string $pluralLabel = 'Demandes de couplage';

    protected static ?string $label = 'Demande de couplage';

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

                Forms\Components\TextInput::make('contact_phone')
                    ->label('Téléphone')
                    ->required()
                    ->maxLength(30),

                Forms\Components\Select::make('pet_species')
                    ->label('Espèce')
                    ->options(['dog' => 'Chien', 'cat' => 'Chat'])
                    ->required(),

                Forms\Components\TextInput::make('pet_breed')
                    ->label('Race')
                    ->required(),

                Forms\Components\Select::make('pet_sex')
                    ->label('Sexe')
                    ->options(['male' => 'Mâle', 'female' => 'Femelle'])
                    ->required(),

                Forms\Components\TextInput::make('pet_age')
                    ->label('Âge')
                    ->required(),

                Forms\Components\Select::make('vaccinated')
                    ->label('Vaccins à jour')
                    ->options([
                        'yes' => 'Oui',
                        'no' => 'Non',
                        'unknown' => 'À confirmer',
                    ])
                    ->required(),

                Forms\Components\TextInput::make('health_status')
                    ->label('État de santé'),

                Forms\Components\TextInput::make('preferred_breed')
                    ->label('Race recherchée'),

                Forms\Components\Textarea::make('message')
                    ->label('Message du demandeur')
                    ->columnSpanFull(),

                Forms\Components\TextInput::make('estimated_price')
                    ->label('Tarif estimé (DH)')
                    ->numeric()
                    ->prefix('DH'),

                Forms\Components\Select::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'En attente',
                        'approved' => 'Validée',
                        'rejected' => 'Refusée',
                        'completed' => 'Terminée',
                    ])
                    ->required()
                    ->default('pending'),

                Forms\Components\Textarea::make('admin_notes')
                    ->label('Notes administratives')
                    ->columnSpanFull(),
            ])
            ->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Demandeur')
                    ->searchable(),

                Tables\Columns\TextColumn::make('contact_phone')
                    ->label('Téléphone'),

                Tables\Columns\TextColumn::make('pet_breed')
                    ->label('Race')
                    ->searchable(),

                Tables\Columns\TextColumn::make('pet_species')
                    ->label('Espèce')
                    ->badge(),

                Tables\Columns\TextColumn::make('estimated_price')
                    ->label('Tarif estimé')
                    ->money('MAD')
                    ->placeholder('—'),

                Tables\Columns\TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'approved' => 'success',
                        'rejected' => 'danger',
                        'completed' => 'info',
                        default => 'gray',
                    }),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Reçue le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status'),
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

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCouplingRequests::route('/'),
            'create' => Pages\CreateCouplingRequest::route('/create'),
            'edit' => Pages\EditCouplingRequest::route('/{record}/edit'),
        ];
    }
}
