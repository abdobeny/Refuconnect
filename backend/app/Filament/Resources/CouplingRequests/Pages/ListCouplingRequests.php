<?php

namespace App\Filament\Resources\CouplingRequests\Pages;

use App\Filament\Resources\CouplingRequests\CouplingRequestResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListCouplingRequests extends ListRecords
{
    protected static string $resource = CouplingRequestResource::class;

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
