<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::after(function ($user, $ability) {
            return $user->is_super_admin === true;
        });

        Gate::define('do-admin', function ($user) {
            return $user->is_admin === true;
        });

        Gate::define('do-moderation', function ($user) {
            return $user->is_moderator === true ||
                    $user->is_admin === true;
        });

        Gate::define('access-backend', function ($user) {
            return $user->is_moderator === true ||
                    $user->is_admin === true;
        });
    }
}
