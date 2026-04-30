<?php

namespace App\Filament\Resources\Adoptions;

use App\Filament\Resources\Adoptions\Pages;
use App\Models\Adoption;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use BackedEnum;

class AdoptionResource extends Resource
{
    protected static ?string $model = Adoption::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-heart';
    protected static ?string $navigationLabel = 'Adoptions';
    protected static ?string $pluralLabel = 'Demandes d\'adoption';
    protected static ?string $label = 'Demande d\'adoption';

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Forms\Components\Select::make('animal_id')
                    ->label('Animal')
                    ->relationship('animal', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),

                Forms\Components\Select::make('user_id')
                    ->label('Utilisateur / Adoptant')
                    ->relationship('user', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),

                Forms\Components\Select::make('statut')
                    ->label('Statut')
                    ->options([
                        'en_attente' => 'En attente',
                        'validée'    => 'Validée',
                        'refusée'    => 'Refusée',
                    ])
                    ->required()
                    ->default('en_attente')
                    ->live(),

                Forms\Components\Textarea::make('motivation')
                    ->label('Pourquoi souhaitez-vous adopter cet animal ?')
                    ->columnSpanFull()
                    ->rows(4),

                Forms\Components\Textarea::make('notes')
                    ->label('Notes administratives (interne)')
                    ->columnSpanFull(),
            ])
            ->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('animal.name')
                    ->label('Animal')
                    ->searchable(),

                Tables\Columns\TextColumn::make('user.name')
                    ->label('Adoptant')
                    ->searchable(),

                Tables\Columns\TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'en_attente' => 'warning',
                        'validée'    => 'success',
                        'refusée'    => 'danger',
                        default      => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'en_attente' => 'En attente',
                        'validée'    => 'Validée',
                        'refusée'    => 'Refusée',
                    }),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date de demande')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'en_attente' => 'En attente',
                        'validée'    => 'Validée',
                        'refusée'    => 'Refusée',
                    ]),
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
            'index' => Pages\ListAdoptions::route('/'),
            'create' => Pages\CreateAdoption::route('/create'),
            'edit' => Pages\EditAdoption::route('/{record}/edit'),
        ];
    }
}