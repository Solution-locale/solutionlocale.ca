<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        \Solutionlocale\Commons\Models\Category::observe(\Solutionlocale\Commons\Observers\CategoryObserver::class);
        \Solutionlocale\Commons\Models\Place::observe(\Solutionlocale\Commons\Observers\PlaceObserver::class);
        \Solutionlocale\Commons\Models\Region::observe(\Solutionlocale\Commons\Observers\RegionObserver::class);
        \Solutionlocale\Commons\Models\Rcm::observe(\Solutionlocale\Commons\Observers\RCMObserver::class);
    }
}
