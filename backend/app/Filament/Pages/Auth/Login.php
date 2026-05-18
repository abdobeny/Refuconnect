<?php

namespace App\Filament\Pages\Auth;

use Filament\Auth\Pages\Login as BaseLogin;
use Illuminate\Contracts\Support\Htmlable;

class Login extends BaseLogin
{
    public function getHeading(): string | Htmlable
    {
        return 'Connexion';
    }

    public function getSubheading(): string | Htmlable | null
    {
        return 'Gérez le refuge depuis votre espace admin.';
    }
}
