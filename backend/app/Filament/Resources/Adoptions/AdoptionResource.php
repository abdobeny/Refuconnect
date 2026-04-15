<?php

namespace App\Filament\Resources\Adoptions;

use App\Filament\Resources\Adoptions\Pages\CreateAdoption;
use App\Filament\Resources\Adoptions\Pages\EditAdoption;
use App\Filament\Resources\Adoptions\Pages\ListAdoptions;
use App\Filament\Resources\Adoptions\Schemas\AdoptionForm;
use App\Filament\Resources\Adoptions\Tables\AdoptionsTable;
use App\Models\Adoption;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AdoptionResource extends Resource
{
    protected static ?string $model = Adoption::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return AdoptionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AdoptionsTable::configure($table);
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
            'index' => ListAdoptions::route('/'),
            'create' => CreateAdoption::route('/create'),
            'edit' => EditAdoption::route('/{record}/edit'),
        ];
    }
}
