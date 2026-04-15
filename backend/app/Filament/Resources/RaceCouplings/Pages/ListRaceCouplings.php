<?php

namespace App\Filament\Resources\RaceCouplings\Pages;

use App\Filament\Resources\RaceCouplings\RaceCouplingResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListRaceCouplings extends ListRecords
{
    protected static string $resource = RaceCouplingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
