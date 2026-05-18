<?php

namespace App\Filament\Resources\Animals\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class AnimalForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nom')
                    ->required(),

                Select::make('species')
                    ->label('Espèce')
                    ->options([
                        'dog' => 'Chien',
                        'cat' => 'Chat',
                    ])
                    ->required(),

                TextInput::make('breed')
                    ->label('Race')
                    ->required(),

                TextInput::make('age')
                    ->label('Âge')
                    ->required()
                    ->numeric(),

                Select::make('sex')
                    ->label('Sexe')
                    ->options([
                        'male' => 'Mâle',
                        'female' => 'Femelle',
                    ])
                    ->required(),

                Select::make('size')
                    ->label('Taille')
                    ->options([
                        'small' => 'Petit',
                        'medium' => 'Moyen',
                        'large' => 'Grand',
                    ]),

                Toggle::make('vaccinated')
                    ->label('Vacciné'),

                Toggle::make('sterilized')
                    ->label('Stérilisé'),

                Select::make('health_status')
                    ->label('État de santé')
                    ->options([
                        'good' => 'Bon',
                        'fair' => 'Moyen',
                        'critical' => 'Critique',
                    ])
                    ->default('good'),

                Textarea::make('description')
                    ->label('Description')
                    ->columnSpanFull(),

                Select::make('status')
                    ->label('Statut')
                    ->options([
                        'available' => 'Disponible',
                        'adopted' => 'Adopté',
                        'in_care' => 'En soins',
                    ])
                    ->default('available')
                    ->required(),

                FileUpload::make('photos')
                    ->label('Photos')
                    ->multiple()
                    ->image()
                    ->directory('animals')
                    ->maxFiles(5),
            ]);
    }
}