<?php

namespace App\Filament\Resources\RaceCouplings;

use App\Filament\Resources\RaceCouplings\Pages\CreateRaceCoupling;
use App\Filament\Resources\RaceCouplings\Pages\EditRaceCoupling;
use App\Filament\Resources\RaceCouplings\Pages\ListRaceCouplings;
use App\Filament\Resources\RaceCouplings\Schemas\RaceCouplingForm;
use App\Filament\Resources\RaceCouplings\Tables\RaceCouplingsTable;
use App\Models\RaceCoupling;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class RaceCouplingResource extends Resource
{
    protected static ?string $model = RaceCoupling::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return RaceCouplingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return RaceCouplingsTable::configure($table);
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
            'index' => ListRaceCouplings::route('/'),
            'create' => CreateRaceCoupling::route('/create'),
            'edit' => EditRaceCoupling::route('/{record}/edit'),
        ];
    }
}
