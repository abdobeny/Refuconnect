<?php

namespace App\Filament\Resources\Donations;

use App\Filament\Resources\Donations\Pages;
use App\Models\Donation;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use BackedEnum;

class DonationResource extends Resource
{
    protected static ?string $model = Donation::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-banknotes';
    protected static ?string $navigationLabel = 'Dons';

    protected static string | \UnitEnum | null $navigationGroup = 'Demandes';

    protected static ?int $navigationSort = 2;
    protected static ?string $pluralLabel = 'Historique des dons';
    protected static ?string $label = 'Don';

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->label('Donateur')
                    ->relationship('user', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),

                Forms\Components\Select::make('type')
                    ->label('Type de don')
                    ->options([
                        'financial' => 'Don financier',
                        'food' => 'Nourriture',
                        'material' => 'Matériel',
                    ])
                    ->default('financial')
                    ->required()
                    ->live(),

                Forms\Components\TextInput::make('amount')
                    ->label('Montant (DH)')
                    ->numeric()
                    ->prefix('DH')
                    ->minValue(1)
                    ->required(fn (callable $get) => $get('type') === 'financial')
                    ->visible(fn (callable $get) => $get('type') === 'financial'),

                Forms\Components\TextInput::make('item_description')
                    ->label('Description de l\'objet')
                    ->placeholder('Ex: 5kg de croquettes, panier, etc.')
                    ->visible(fn (callable $get) => in_array($get('type'), ['food', 'material'])),

                Forms\Components\Select::make('status')
                    ->label('Statut')
                    ->options([
                        'pending'   => 'En attente',
                        'completed' => 'Complété',
                        'failed'    => 'Échoué',
                        'refunded'  => 'Remboursé',
                    ])
                    ->default('pending')
                    ->required()
                    ->live(),

                Forms\Components\DatePicker::make('donation_date')
                    ->label('Date du don')
                    ->default(now())
                    ->required(),

                Forms\Components\Textarea::make('message')
                    ->label('Message du donateur (optionnel)')
                    ->columnSpanFull()
                    ->rows(3),

                Forms\Components\Textarea::make('admin_notes')
                    ->label('Notes administratives (interne)')
                    ->columnSpanFull(),
            ])
            ->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Donateur')
                    ->searchable()
                    ->placeholder('Anonyme'),

                Tables\Columns\TextColumn::make('amount')
                    ->label('Montant')
                    ->money('MAD')
                    ->alignRight()
                    ->sortable(),

                Tables\Columns\TextColumn::make('type')
                    ->label('Type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'financial' => 'success',
                        'food' => 'warning',
                        'material' => 'info',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'financial' => 'Financier',
                        'food' => 'Nourriture',
                        'material' => 'Matériel',
                        default => $state,
                    }),

                Tables\Columns\TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'completed' => 'success',
                        'failed' => 'danger',
                        'refunded' => 'gray',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'En attente',
                        'completed' => 'Complété',
                        'failed' => 'Échoué',
                        'refunded' => 'Remboursé',
                        default => $state,
                    }),

                Tables\Columns\TextColumn::make('donation_date')
                    ->label('Date')
                    ->date('d/m/Y')
                    ->sortable(),
            ])
            ->defaultSort('donation_date', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status'),
                Tables\Filters\SelectFilter::make('type'),
                Tables\Filters\Filter::make('donation_date')
                    ->form([
                        Forms\Components\DatePicker::make('created_from'),
                        Forms\Components\DatePicker::make('created_until'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when(
                                $data['created_from'] ?? null,
                                fn ($query, $date) => $query->whereDate('donation_date', '>=', $date),
                            )
                            ->when(
                                $data['created_until'] ?? null,
                                fn ($query, $date) => $query->whereDate('donation_date', '<=', $date),
                            );
                    }),
            ])
            ->actions([
                Action::make('complete')
                    ->label('Marquer complété')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading('Marquer ce don comme complété')
                    ->modalSubmitActionLabel('Complété')
                    ->action(function (Donation $record) {
                        $record->update(['status' => 'completed']);

                        Notification::make()
                            ->title('Don complété')
                            ->body("Le don de {$record->user?->name} a été marqué comme complété.")
                            ->success()
                            ->send();
                    })
                    ->visible(fn (Donation $record) => $record->status === 'pending'),

                Action::make('fail')
                    ->label('Marquer échoué')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->form([
                        Forms\Components\Textarea::make('admin_notes')
                            ->label('Raison de l\'échec')
                            ->placeholder('Expliquez pourquoi ce don a échoué...')
                            ->required()
                            ->rows(4),
                    ])
                    ->modalHeading('Marquer ce don comme échoué')
                    ->modalSubmitActionLabel('Échoué')
                    ->action(function (Donation $record, array $data) {
                        $record->update([
                            'status' => 'failed',
                            'admin_notes' => $data['admin_notes'],
                        ]);

                        Notification::make()
                            ->title('Don échoué')
                            ->body("Le don de {$record->user?->name} a été marqué comme échoué.")
                            ->warning()
                            ->send();
                    })
                    ->visible(fn (Donation $record) => $record->status === 'pending'),

                EditAction::make(),
                ViewAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDonations::route('/'),
            'create' => Pages\CreateDonation::route('/create'),
            'edit' => Pages\EditDonation::route('/{record}/edit'),
        ];
    }
}
