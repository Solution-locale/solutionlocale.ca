<?php

namespace App\Http\Middleware;

use Closure;

class LimitAuthedRegularUsers
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->user()->is_commercant) {
            return redirect('accueil');
        }

        return $next($request);
    }
}
