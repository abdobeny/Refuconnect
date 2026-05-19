<?php

namespace App\Filament\Resources\Adoptions\Pages;

use App\Filament\Resources\Adoptions\AdoptionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListAdoptions extends ListRecords
{
    protected static string $resource = AdoptionResource::class;

    protected function getTableQuery(): Builder
    {
        return parent::getTableQuery()->with(['animal', 'user']);
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
