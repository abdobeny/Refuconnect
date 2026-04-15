<?php

namespace App\Filament\Resources\Donations\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class DonationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->numeric()
                    ->default(null),
                Select::make('type')
                    ->options(['financier' => 'Financier', 'nourriture' => 'Nourriture', 'matériel' => 'Matériel'])
                    ->required(),
                TextInput::make('montant')
                    ->numeric()
                    ->default(null),
                TextInput::make('objet')
                    ->default(null),
                Textarea::make('details')
                    ->default(null)
                    ->columnSpanFull(),
            ]);
    }
}
