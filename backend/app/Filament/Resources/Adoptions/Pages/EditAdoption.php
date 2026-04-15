<?php

namespace App\Filament\Resources\Adoptions\Pages;

use App\Filament\Resources\Adoptions\AdoptionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAdoption extends EditRecord
{
    protected static string $resource = AdoptionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
