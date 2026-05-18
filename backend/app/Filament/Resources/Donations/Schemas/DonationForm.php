<?php

namespace App\Filament\Resources\Donations\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\DateTimePicker;
use Filament\Schemas\Schema;

class DonationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->label('Donateur')
                    ->relationship('user', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),

                Select::make('type')
                    ->label('Type de don')
                    ->options([
                        'financial' => 'Don financier',
                        'food' => 'Nourriture',
                        'material' => 'Matériel',
                    ])
                    ->default('financial')
                    ->required(),

                TextInput::make('amount')
                    ->label('Montant (DH)')
                    ->numeric()
                    ->prefix('DH')
                    ->visible(fn (callable $get) => $get('type') === 'financial'),

                TextInput::make('item_description')
                    ->label('Description de l\'objet')
                    ->placeholder('Ex: 5kg de croquettes, panier, etc.')
                    ->visible(fn (callable $get) => in_array($get('type'), ['food', 'material'])),

                Select::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'En attente',
                        'completed' => 'Complété',
                        'failed' => 'Échoué',
                        'refunded' => 'Remboursé',
                    ])
                    ->default('pending')
                    ->required(),

                DateTimePicker::make('donation_date')
                    ->label('Date du don')
                    ->default(now()),

                Textarea::make('message')
                    ->label('Message du donateur')
                    ->columnSpanFull(),

                Textarea::make('admin_notes')
                    ->label('Notes administratives')
                    ->columnSpanFull(),
            ]);
    }
}