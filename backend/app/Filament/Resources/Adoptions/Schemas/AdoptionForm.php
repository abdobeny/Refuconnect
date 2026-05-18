<?php

namespace App\Filament\Resources\Adoptions\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class AdoptionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('animal_id')
                    ->label('Animal')
                    ->relationship('animal', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),

                Select::make('user_id')
                    ->label('Utilisateur / Adoptant')
                    ->relationship('user', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),

                Select::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'En attente',
                        'approved' => 'Validée',
                        'rejected' => 'Refusée',
                    ])
                    ->default('pending')
                    ->required()
                    ->live(),

                DateTimePicker::make('requested_at')
                    ->label('Date de demande')
                    ->default(now())
                    ->required(),

                Textarea::make('motivation')
                    ->label('Pourquoi souhaitez-vous adopter cet animal ?')
                    ->columnSpanFull()
                    ->rows(4),

                Textarea::make('notes')
                    ->label('Notes administratives (interne)')
                    ->columnSpanFull(),
            ]);
    }
}