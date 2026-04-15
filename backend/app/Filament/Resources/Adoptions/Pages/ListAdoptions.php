<?php

namespace App\Filament\Resources\Adoptions\Pages;

use App\Filament\Resources\Adoptions\AdoptionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAdoptions extends ListRecords
{
    protected static string $resource = AdoptionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
