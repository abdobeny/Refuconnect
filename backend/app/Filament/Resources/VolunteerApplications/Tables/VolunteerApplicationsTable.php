<?php

namespace App\Filament\Resources\VolunteerApplications\Tables;

use App\Models\VolunteerApplication;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class VolunteerApplicationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nom')
                    ->searchable(),
                TextColumn::make('email')
                    ->label('Email')
                    ->searchable(),
                TextColumn::make('phone')
                    ->label('Téléphone')
                    ->placeholder('—'),
                TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'reviewed' => 'info',
                        'accepted' => 'success',
                        'rejected' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'En attente',
                        'reviewed' => 'Examinée',
                        'accepted' => 'Acceptée',
                        'rejected' => 'Refusée',
                        default => $state,
                    }),
                TextColumn::make('created_at')
                    ->label('Date de candidature')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'En attente',
                        'reviewed' => 'Examinée',
                        'accepted' => 'Acceptée',
                        'rejected' => 'Refusée',
                    ]),
            ])
            ->recordActions([
                Action::make('accept')
                    ->label('Accepter')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading('Accepter cette candidature')
                    ->modalSubmitActionLabel('Accepter')
                    ->action(function (VolunteerApplication $record) {
                        $record->update(['status' => 'accepted']);

                        Notification::make()
                            ->title('Candidature acceptée')
                            ->body("La candidature de {$record->name} a été acceptée.")
                            ->success()
                            ->send();
                    })
                    ->visible(fn (VolunteerApplication $record) => $record->status === 'pending'),

                Action::make('reject')
                    ->label('Refuser')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->form([
                        Forms\Components\Textarea::make('notes')
                            ->label('Raison du refus')
                            ->placeholder('Expliquez pourquoi cette candidature est refusée...')
                            ->required()
                            ->rows(4),
                    ])
                    ->modalHeading('Refuser cette candidature')
                    ->modalDescription('La raison sera ajoutée aux notes administratives.')
                    ->modalSubmitActionLabel('Refuser')
                    ->action(function (VolunteerApplication $record, array $data) {
                        $record->update([
                            'status' => 'rejected',
                            'notes' => $data['notes'],
                        ]);

                        Notification::make()
                            ->title('Candidature refusée')
                            ->body("La candidature de {$record->name} a été refusée.")
                            ->warning()
                            ->send();
                    })
                    ->visible(fn (VolunteerApplication $record) => $record->status === 'pending'),

                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
