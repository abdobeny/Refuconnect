<?php

namespace App\Filament\Resources\CouplingRequests\Pages;

use App\Filament\Resources\CouplingRequests\CouplingRequestResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCouplingRequest extends EditRecord
{
    protected static string $resource = CouplingRequestResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
