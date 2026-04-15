<?php

namespace App\Filament\Resources\GroomingReservations\Pages;

use App\Filament\Resources\GroomingReservations\GroomingReservationResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListGroomingReservations extends ListRecords
{
    protected static string $resource = GroomingReservationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
