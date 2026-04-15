<?php

namespace App\Filament\Resources\GroomingReservations;

use App\Filament\Resources\GroomingReservations\Pages\CreateGroomingReservation;
use App\Filament\Resources\GroomingReservations\Pages\EditGroomingReservation;
use App\Filament\Resources\GroomingReservations\Pages\ListGroomingReservations;
use App\Filament\Resources\GroomingReservations\Schemas\GroomingReservationForm;
use App\Filament\Resources\GroomingReservations\Tables\GroomingReservationsTable;
use App\Models\GroomingReservation;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class GroomingReservationResource extends Resource
{
    protected static ?string $model = GroomingReservation::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return GroomingReservationForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return GroomingReservationsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListGroomingReservations::route('/'),
            'create' => CreateGroomingReservation::route('/create'),
            'edit' => EditGroomingReservation::route('/{record}/edit'),
        ];
    }
}
