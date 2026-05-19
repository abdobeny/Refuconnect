<?php

namespace App\Providers\Filament;

use App\Filament\Pages\Auth\Login;
use App\Filament\Pages\Dashboard;
use App\Filament\Resources\Adoptions\AdoptionResource;
use App\Filament\Resources\Animals\AnimalResource;
use App\Filament\Resources\CouplingRequests\CouplingRequestResource;
use App\Filament\Resources\Donations\DonationResource;
use App\Filament\Resources\GroomingReservations\GroomingReservationResource;
use App\Filament\Resources\Testimonials\TestimonialResource;
use App\Filament\Resources\Users\UsersResource;
use App\Filament\Resources\VolunteerApplications\VolunteerApplicationResource;
use App\Filament\Widgets\AnimalStatusChart;
use App\Filament\Widgets\MonthlyAdoptionsChart;
use App\Filament\Widgets\RecentAdoptions;
use App\Filament\Widgets\RecentAnimalsWidget;
use App\Filament\Widgets\StatsOverview;
use Filament\Enums\ThemeMode;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Navigation\NavigationGroup;
use Filament\Navigation\NavigationItem;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\View\PanelsRenderHook;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\HtmlString;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')

            ->viteTheme('resources/css/filament/admin/theme.css')

            ->brandName('RefuConnect')
            ->brandLogo(fn () => view('filament.components.brand'))
            ->brandLogoHeight('2.25rem')

            ->favicon(asset('images/favicon.svg'))

            ->font('Inter')
            ->serifFont('Playfair Display')

            ->colors([
                'primary' => Color::hex('#2F3634'),
                'gray'    => Color::hex('#786D64'),
                'danger'  => Color::hex('#B85C4E'),
                'success' => Color::hex('#5C7A6B'),
                'warning' => Color::hex('#A9795F'),
                'info'    => Color::hex('#6E706C'),
            ])

            ->darkMode(false)
            ->defaultThemeMode(ThemeMode::Light)

            ->login(Login::class)

            ->sidebarCollapsibleOnDesktop()

            ->navigationGroups([
                NavigationGroup::make('Refuge')->icon('heroicon-o-home'),
                NavigationGroup::make('Demandes')->icon('heroicon-o-inbox'),
            ])

            ->navigationItems([
                NavigationItem::make('Voir le site')
                    ->url(config('app.frontend_url', 'http://localhost:5173'))
                    ->icon('heroicon-o-arrow-top-right-on-square')
                    ->group('Navigation')
                    ->sort(99),
            ])

            ->resources([
                AnimalResource::class,
                AdoptionResource::class,
                DonationResource::class,
                GroomingReservationResource::class,
                CouplingRequestResource::class,
                VolunteerApplicationResource::class,
                TestimonialResource::class,
                UsersResource::class,
            ])

            ->pages([
                Dashboard::class,
            ])

            ->widgets([
                StatsOverview::class,
                AnimalStatusChart::class,
                MonthlyAdoptionsChart::class,
                RecentAdoptions::class,
                RecentAnimalsWidget::class,
            ])

            ->renderHook(
                PanelsRenderHook::HEAD_END,
                fn () => new HtmlString(<<<HTML
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
HTML)
            )

            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])

            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}