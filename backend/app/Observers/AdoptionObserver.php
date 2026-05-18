<?php

namespace App\Observers;

use App\Models\Adoption;

class AdoptionObserver
{
    public function saved(Adoption $adoption): void
    {
        if (! $adoption->wasChanged('status')) {
            return;
        }

        if ($adoption->status === 'approved' && $adoption->animal) {
            $adoption->animal->update(['status' => 'adopted']);
        }
    }
}
