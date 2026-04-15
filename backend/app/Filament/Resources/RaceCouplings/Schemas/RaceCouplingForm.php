<?php

namespace App\Filament\Resources\RaceCouplings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class RaceCouplingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('race')
                    ->required(),
                TextInput::make('tarif')
                    ->required()
                    ->numeric(),
                Textarea::make('description_accouplement')
                    ->default(null)
                    ->columnSpanFull(),
            ]);
    }
}
