<?php

namespace App\Filament\Resources\VolunteerApplications\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class VolunteerApplicationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nom complet')
                    ->required(),
                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required(),
                TextInput::make('phone')
                    ->label('Téléphone')
                    ->tel(),
                Textarea::make('message')
                    ->label('Disponibilités et intérêts')
                    ->columnSpanFull()
                    ->rows(4),
                Select::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'En attente',
                        'reviewed' => 'Examinée',
                        'accepted' => 'Acceptée',
                        'rejected' => 'Refusée',
                    ])
                    ->required()
                    ->default('pending')
                    ->live(),
                Textarea::make('notes')
                    ->label('Notes administratives (interne)')
                    ->columnSpanFull(),
            ]);
    }
}
