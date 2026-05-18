<?php

namespace App\Filament\Resources\CouplingRequests\Pages;

use App\Filament\Resources\CouplingRequests\CouplingRequestResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCouplingRequests extends ListRecords
{
    protected static string $resource = CouplingRequestResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
