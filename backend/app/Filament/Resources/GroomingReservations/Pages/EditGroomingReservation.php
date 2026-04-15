<?php

namespace App\Filament\Resources\GroomingReservations\Pages;

use App\Filament\Resources\GroomingReservations\GroomingReservationResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditGroomingReservation extends EditRecord
{
    protected static string $resource = GroomingReservationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
