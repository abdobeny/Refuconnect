<?php

namespace App\Filament\Resources\Animals;

use App\Filament\Resources\Animals\Pages;
use App\Models\Animal;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use BackedEnum;

class AnimalResource extends Resource
{
    protected static ?string $model = Animal::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-home'; // 🐾 icon
    protected static ?string $navigationLabel = 'Animaux';
    protected static ?string $pluralLabel = 'Animaux';
    protected static ?string $label = 'Animal';
    protected static ?string $modelLabel = 'Animal';

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Nom')
                    ->required()
                    ->maxLength(255),

                Forms\Components\Select::make('species')
                    ->label('Espèce')
                    ->options(['Chien' => 'Chien', 'Chat' => 'Chat'])
                    ->required(),

                Forms\Components\TextInput::make('breed')
                    ->label('Race')
                    ->required(),

                Forms\Components\TextInput::make('age')
                    ->label('Âge')
                    ->numeric()
                    ->required(),

                Forms\Components\Select::make('sex')
                    ->label('Sexe')
                    ->options(['Male' => 'Mâle', 'Female' => 'Femelle'])
                    ->required(),

                Forms\Components\TextInput::make('size')
                    ->label('Taille'),

                Forms\Components\Toggle::make('vaccinated')
                    ->label('Vacciné'),

                Forms\Components\Textarea::make('description')
                    ->label('Description')
                    ->columnSpanFull(),

                Forms\Components\Select::make('status')
                    ->label('Statut')
                    ->options([
                        'Disponible' => 'Disponible',
                        'Adopté' => 'Adopté',
                        'En soins' => 'En soins',
                        'Réservé' => 'Réservé',
                    ])
                    ->required()
                    ->default('Disponible'),

                Forms\Components\FileUpload::make('photos')
                    ->label('Photos')
                    ->multiple()
                    ->image()
                    ->directory('animals')
                    ->maxFiles(5),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('photos')
                    ->label('Photo')
                    ->square(),
                Tables\Columns\TextColumn::make('name')
                    ->label('Nom')
                    ->searchable(),
                Tables\Columns\TextColumn::make('species')
                    ->label('Espèce'),
                Tables\Columns\TextColumn::make('breed')
                    ->label('Race'),
                Tables\Columns\TextColumn::make('age'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Disponible' => 'success',
                        'Adopté' => 'info',
                        'En soins' => 'warning',
                        default => 'gray',
                    }),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status'),
                Tables\Filters\SelectFilter::make('species'),
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
            'index' => Pages\ListAnimals::route('/'),
            'create' => Pages\CreateAnimal::route('/create'),
            'edit' => Pages\EditAnimal::route('/{record}/edit'),
        ];
    }
}