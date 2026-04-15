<?php

namespace App\Filament\Resources\GroomingReservations\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class GroomingReservationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                TextInput::make('animal_name')
                    ->required(),
                DateTimePicker::make('reservation_date')
                    ->required(),
                Select::make('type_soin')
                    ->options(['bain' => 'Bain', 'tonte' => 'Tonte', 'nettoyage' => 'Nettoyage'])
                    ->required(),
                Select::make('statut')
                    ->options(['confirmé' => 'Confirmé', 'annulé' => 'Annulé', 'terminé' => 'Terminé'])
                    ->default('confirmé')
                    ->required(),
            ]);
    }
}
