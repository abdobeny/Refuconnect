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

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-home';

    protected static ?string $navigationLabel = 'Animaux';

    protected static string | \UnitEnum | null $navigationGroup = 'Refuge';

    protected static ?int $navigationSort = 1;
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
                    ->options(['dog' => 'Chien', 'cat' => 'Chat'])
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
                    ->options(['male' => 'Mâle', 'female' => 'Femelle'])
                    ->required(),

                Forms\Components\Select::make('size')
                    ->label('Taille')
                    ->options([
                        'small' => 'Petit',
                        'medium' => 'Moyen',
                        'large' => 'Grand',
                    ]),

                Forms\Components\Toggle::make('vaccinated')
                    ->label('Vacciné'),

                Forms\Components\Toggle::make('sterilized')
                    ->label('Stérilisé'),

                Forms\Components\Select::make('health_status')
                    ->label('État de santé')
                    ->options([
                        'good' => 'Bon',
                        'fair' => 'Moyen',
                        'critical' => 'Critique',
                    ])
                    ->default('good'),

                Forms\Components\Textarea::make('description')
                    ->label('Description')
                    ->columnSpanFull(),

                Forms\Components\Select::make('status')
                    ->label('Statut')
                    ->options([
                        'disponible' => 'Disponible',
                        'urgent' => 'Urgent',
                        'famille_accueil' => 'Famille d\'accueil',
                        'adoption' => 'À l\'adoption',
                        'adopte' => 'Adopté',
                        'en_soins' => 'En soins',
                        'decede' => 'Décédé',
                    ])
                    ->required()
                    ->default('disponible'),

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
                    ->label('Statut')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'disponible' => 'Disponible',
                        'urgent' => 'Urgent',
                        'famille_accueil' => 'Famille d\'accueil',
                        'adoption' => 'À l\'adoption',
                        'adopte' => 'Adopté',
                        'en_soins' => 'En soins',
                        'decede' => 'Décédé',
                        default => $state,
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'disponible' => 'success',
                        'urgent' => 'danger',
                        'famille_accueil' => 'info',
                        'adoption' => 'warning',
                        'adopte' => 'gray',
                        'en_soins' => 'warning',
                        'decede' => 'secondary',
                        default => 'gray',
                    }),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Statut')
                    ->options([
                        'disponible' => 'Disponible',
                        'urgent' => 'Urgent',
                        'famille_accueil' => 'Famille d\'accueil',
                        'adoption' => 'À l\'adoption',
                        'adopte' => 'Adopté',
                        'en_soins' => 'En soins',
                        'decede' => 'Décédé',
                    ]),
                Tables\Filters\SelectFilter::make('species')
                    ->label('Espèce')
                    ->options([
                        'dog' => 'Chien',
                        'cat' => 'Chat',
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
            'index' => Pages\ListAnimals::route('/'),
            'create' => Pages\CreateAnimal::route('/create'),
            'edit' => Pages\EditAnimal::route('/{record}/edit'),
        ];
    }
}