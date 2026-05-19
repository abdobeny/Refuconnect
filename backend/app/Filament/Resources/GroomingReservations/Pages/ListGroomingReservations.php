<?php

namespace App\Filament\Resources\GroomingReservations\Pages;

use App\Filament\Resources\GroomingReservations\GroomingReservationResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListGroomingReservations extends ListRecords
{
    protected static string $resource = GroomingReservationResource::class;

    protected function getTableQuery(): Builder
    {
        return parent::getTableQuery()->with(['user']);
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
