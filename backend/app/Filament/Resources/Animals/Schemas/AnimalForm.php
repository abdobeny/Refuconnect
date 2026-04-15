<?php

namespace App\Filament\Resources\Animals\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class AnimalForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nom')
                    ->required(),
                TextInput::make('espece')
                    ->required(),
                TextInput::make('race')
                    ->required(),
                TextInput::make('age')
                    ->required()
                    ->numeric(),
                Select::make('sexe')
                    ->options(['mâle' => 'Mâle', 'femelle' => 'Femelle'])
                    ->required(),
                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('photo')
                    ->default(null),
                Select::make('statut')
                    ->options(['disponible' => 'Disponible', 'adopté' => 'Adopté', 'en soins' => 'En soins'])
                    ->default('disponible')
                    ->required(),
            ]);
    }
}
