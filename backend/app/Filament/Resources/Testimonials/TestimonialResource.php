<?php

namespace App\Filament\Resources\Testimonials;

use App\Filament\Resources\Testimonials\Pages;
use App\Models\Testimonial;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\Action;
use Filament\Forms;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class TestimonialResource extends Resource
{
    protected static ?string $model = Testimonial::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-chat-bubble-left-right';
    protected static ?string $navigationLabel = 'Témoignages';
    protected static ?string $pluralLabel = 'Témoignages';
    protected static ?string $label = 'Témoignage';

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->label('Utilisateur lié')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->preload(),

                Forms\Components\TextInput::make('name')
                    ->label('Nom affiché')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('role')
                    ->label('Rôle')
                    ->helperText('Ex: Adoptante, Bénévole, Donatrice')
                    ->required()
                    ->maxLength(80),

                Forms\Components\Textarea::make('quote')
                    ->label('Témoignage')
                    ->required()
                    ->rows(4)
                    ->maxLength(500)
                    ->columnSpanFull(),

                Forms\Components\TextInput::make('detail')
                    ->label('Détail court')
                    ->maxLength(140)
                    ->columnSpanFull(),

                Forms\Components\Select::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'En attente',
                        'approved' => 'Approuvé',
                        'rejected' => 'Rejeté',
                    ])
                    ->default('pending')
                    ->required()
                    ->live(),

                Forms\Components\Textarea::make('rejection_reason')
                    ->label('Motif du rejet')
                    ->helperText('Expliquez pourquoi ce témoignage a été rejeté')
                    ->rows(3)
                    ->maxLength(500)
                    ->columnSpanFull()
                    ->visible(fn (Forms\Get $get) => $get('status') === 'rejected'),

                Forms\Components\Toggle::make('featured')
                    ->label("Afficher sur la page d'accueil")
                    ->default(false),

                Forms\Components\TextInput::make('sort_order')
                    ->label('Ordre')
                    ->numeric()
                    ->default(0)
                    ->minValue(0),
            ])
            ->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nom')
                    ->searchable(),

                Tables\Columns\TextColumn::make('role')
                    ->label('Rôle')
                    ->badge()
                    ->searchable(),

                Tables\Columns\TextColumn::make('quote')
                    ->label('Témoignage')
                    ->limit(70)
                    ->searchable(),

                Tables\Columns\TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'approved' => 'success',
                        'pending' => 'warning',
                        'rejected' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'approved' => 'Approuvé',
                        'pending' => 'En attente',
                        'rejected' => 'Rejeté',
                        default => $state,
                    }),

                Tables\Columns\IconColumn::make('featured')
                    ->label('Accueil')
                    ->boolean(),

                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Ordre')
                    ->sortable(),
            ])
            ->defaultSort('sort_order')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'En attente',
                        'approved' => 'Approuvé',
                        'rejected' => 'Rejeté',
                    ]),
                Tables\Filters\TernaryFilter::make('featured')
                    ->label("Affiché sur l'accueil"),
            ])
            ->actions([
                Action::make('approve')
                    ->label('Approuver')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading('Approuver ce témoignage')
                    ->modalDescription("Ce témoignage sera affiché sur la page d'accueil s'il est marqué comme favori.")
                    ->modalSubmitActionLabel('Approuver')
                    ->action(function (Testimonial $record) {
                        $record->update(['status' => 'approved']);

                        Notification::make()
                            ->title('Témoignage approuvé')
                            ->body("Le témoignage de {$record->name} a été approuvé.")
                            ->success()
                            ->send();
                    })
                    ->visible(fn (Testimonial $record) => $record->status === 'pending'),

                Action::make('reject')
                    ->label('Rejeter')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->requiresConfirmation()
                    ->modalHeading('Rejeter ce témoignage')
                    ->modalSubmitActionLabel('Rejeter')
                    ->action(function (Testimonial $record) {
                        $record->update(['status' => 'rejected']);

                        Notification::make()
                            ->title('Témoignage rejeté')
                            ->body("Le témoignage de {$record->name} a été rejeté.")
                            ->warning()
                            ->send();
                    })
                    ->visible(fn (Testimonial $record) => $record->status === 'pending'),

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
            'index' => Pages\ListTestimonials::route('/'),
            'create' => Pages\CreateTestimonial::route('/create'),
            'edit' => Pages\EditTestimonial::route('/{record}/edit'),
        ];
    }
}
