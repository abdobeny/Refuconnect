<?php

namespace App\Filament\Resources\Adoptions;

use App\Filament\Resources\Adoptions\Pages;
use App\Models\Adoption;
use App\Models\Animal;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use BackedEnum;

class AdoptionResource extends Resource
{
    protected static ?string $model = Adoption::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-heart';
    protected static ?string $navigationLabel = 'Adoptions';

    protected static string | \UnitEnum | null $navigationGroup = 'Demandes';

    protected static ?int $navigationSort = 1;
    protected static ?string $pluralLabel = 'Demandes d\'adoption';
    protected static ?string $label = 'Demande d\'adoption';

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Forms\Components\Select::make('animal_id')
                    ->label('Animal')
                    ->relationship('animal', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),

                Forms\Components\Select::make('user_id')
                    ->label('Utilisateur / Adoptant')
                    ->relationship('user', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),

                Forms\Components\Select::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'En attente',
                        'approved'    => 'Validée',
                        'rejected'    => 'Refusée',
                    ])
                    ->required()
                    ->default('pending')
                    ->live(),

                Forms\Components\Textarea::make('motivation')
                    ->label('Pourquoi souhaitez-vous adopter cet animal ?')
                    ->columnSpanFull()
                    ->rows(4),

                Forms\Components\Textarea::make('notes')
                    ->label('Notes administratives (interne)')
                    ->columnSpanFull(),

                Forms\Components\Textarea::make('rejection_reason')
                    ->label('Raison du refus (visible par l\'utilisateur)')
                    ->columnSpanFull()
                    ->rows(3)
                    ->visible(fn (callable $get) => $get('status') === 'rejected'),
            ])
            ->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('animal.name')
                    ->label('Animal')
                    ->searchable(),

                Tables\Columns\TextColumn::make('user.name')
                    ->label('Adoptant')
                    ->searchable(),

                Tables\Columns\TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'approved'    => 'success',
                        'rejected'    => 'danger',
                        default      => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'En attente',
                        'approved'    => 'Validée',
                        'rejected'    => 'Refusée',
                    }),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date de demande')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'En attente',
                        'approved'    => 'Validée',
                        'rejected'    => 'Refusée',
                    ]),
            ])
            ->actions([
                Action::make('approve')
                    ->label('Valider')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading('Valider cette adoption')
                    ->modalDescription('Êtes-vous sûr de vouloir valider cette demande ? Le statut de l\'animal sera automatiquement mis à jour.')
                    ->modalSubmitActionLabel('Valider')
                    ->action(function (Adoption $record) {
                        $record->update(['status' => 'approved']);

                        if ($record->animal) {
                            $record->animal->update(['status' => 'adopted']);
                        }

                        Notification::make()
                            ->title('Adoption validée')
                            ->body("La demande de {$record->user?->name} pour {$record->animal?->name} a été approuvée.")
                            ->success()
                            ->send();
                    })
                    ->visible(fn (Adoption $record) => $record->status === 'pending'),

                Action::make('reject')
                    ->label('Refuser')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->form([
                        Forms\Components\Textarea::make('rejection_reason')
                            ->label('Raison du refus')
                            ->placeholder('Expliquez pourquoi cette demande est refusée...')
                            ->required()
                            ->rows(4),
                    ])
                    ->modalHeading('Refuser cette adoption')
                    ->modalDescription('La raison sera visible par l\'utilisateur dans son espace personnel.')
                    ->modalSubmitActionLabel('Refuser')
                    ->action(function (Adoption $record, array $data) {
                        $record->update([
                            'status' => 'rejected',
                            'rejection_reason' => $data['rejection_reason'],
                        ]);

                        Notification::make()
                            ->title('Adoption refusée')
                            ->body("La demande de {$record->user?->name} pour {$record->animal?->name} a été refusée.")
                            ->warning()
                            ->send();
                    })
                    ->visible(fn (Adoption $record) => $record->status === 'pending'),

                EditAction::make(),
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
            'index' => Pages\ListAdoptions::route('/'),
            'create' => Pages\CreateAdoption::route('/create'),
            'edit' => Pages\EditAdoption::route('/{record}/edit'),
        ];
    }
}
