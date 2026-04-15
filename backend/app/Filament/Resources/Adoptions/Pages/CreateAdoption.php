<?php

namespace App\Filament\Resources\Adoptions\Pages;

use App\Filament\Resources\Adoptions\AdoptionResource;
use Filament\Resources\Pages\CreateRecord;

class CreateAdoption extends CreateRecord
{
    protected static string $resource = AdoptionResource::class;
}
