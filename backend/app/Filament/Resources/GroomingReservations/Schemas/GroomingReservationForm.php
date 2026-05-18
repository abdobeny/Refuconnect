<?php

namespace App\Filament\Resources\GroomingReservations\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class GroomingReservationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->label('Client')
                    ->relationship('user', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),

                TextInput::make('pet_name')
                    ->label('Nom de l\'animal')
                    ->required()
                    ->maxLength(255),

                Select::make('pet_type')
                    ->label('Type d\'animal')
                    ->options([
                        'dog' => 'Chien',
                        'cat' => 'Chat',
                        'other' => 'Autre',
                    ])
                    ->required()
                    ->default('dog'),

                DateTimePicker::make('reservation_date')
                    ->label('Date et heure')
                    ->required(),

                Select::make('service_type')
                    ->label('Type de service')
                    ->options([
                        'bath' => 'Bain',
                        'haircut' => 'Tonte',
                        'full_grooming' => 'Nettoyage complet',
                        'nail_trim' => 'Coupe des griffes',
                        'other' => 'Autre',
                    ])
                    ->required(),

                Select::make('status')
                    ->label('Statut')
                    ->options([
                        'confirmed' => 'Confirmé',
                        'cancelled' => 'Annulé',
                        'completed' => 'Terminé',
                    ])
                    ->default('confirmed')
                    ->required(),

                Textarea::make('notes')
                    ->label('Notes / Observations')
                    ->columnSpanFull(),
            ]);
    }
}