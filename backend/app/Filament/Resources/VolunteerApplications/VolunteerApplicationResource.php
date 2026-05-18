<?php

namespace App\Filament\Resources\VolunteerApplications;

use App\Filament\Resources\VolunteerApplications\Pages\CreateVolunteerApplication;
use App\Filament\Resources\VolunteerApplications\Pages\EditVolunteerApplication;
use App\Filament\Resources\VolunteerApplications\Pages\ListVolunteerApplications;
use App\Filament\Resources\VolunteerApplications\Schemas\VolunteerApplicationForm;
use App\Filament\Resources\VolunteerApplications\Tables\VolunteerApplicationsTable;
use App\Models\VolunteerApplication;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class VolunteerApplicationResource extends Resource
{
    protected static ?string $model = VolunteerApplication::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationLabel = 'Bénévolat';
    protected static string|\UnitEnum|null $navigationGroup = 'Demandes';
    protected static ?int $navigationSort = 3;
    protected static ?string $pluralLabel = 'Candidatures bénévolat';
    protected static ?string $label = 'Candidature bénévolat';

    public static function form(Schema $schema): Schema
    {
        return VolunteerApplicationForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return VolunteerApplicationsTable::configure($table);
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
            'index' => ListVolunteerApplications::route('/'),
            'create' => CreateVolunteerApplication::route('/create'),
            'edit' => EditVolunteerApplication::route('/{record}/edit'),
        ];
    }
}
