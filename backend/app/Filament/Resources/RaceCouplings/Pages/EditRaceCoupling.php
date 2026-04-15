<?php

namespace App\Filament\Resources\RaceCouplings\Pages;

use App\Filament\Resources\RaceCouplings\RaceCouplingResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditRaceCoupling extends EditRecord
{
    protected static string $resource = RaceCouplingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
