<?php

namespace App\Filament\Resources\Adoptions\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class AdoptionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                TextInput::make('animal_id')
                    ->required()
                    ->numeric(),
                DatePicker::make('date_demande')
                    ->required(),
                Select::make('statut')
                    ->options(['en attente' => 'En attente', 'validée' => 'Validée', 'refusée' => 'Refusée'])
                    ->default('en attente')
                    ->required(),
            ]);
    }
}
