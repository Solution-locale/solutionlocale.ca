<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>{{ config('app.name', 'Laravel') }}</title>

        <meta name="description" content="Des ressources locales en contexte de distanciation sociale">
        <meta name="image" content="https://solutionlocale.ca/images/social.jpg">
        
        <meta itemprop="name" content="Solution locale">
        <meta itemprop="description" content="Des ressources locales en contexte de distanciation sociale">
        <meta itemprop="image" content="https://solutionlocale.ca/images/social.jpg">
        
        <meta name="og:title" content="Solution locale">
        <meta name="og:description" content="Des ressources locales en contexte de distanciation sociale">
        <meta name="og:image" content="https://solutionlocale.ca/images/social.jpg">
        <meta name="og:url" content="https://solutionlocale.ca">
        <meta name="og:site_name" content="Solution Locale">
        <meta name="og:locale" content="fr_CA">
        <meta name="og:type" content="website">

        <link href="{{ asset('css/frontend.css') }}" rel="stylesheet">

        @yield('styles-head')

        <script src="{{ asset('js/manifest.js') }}" defer></script>
        <script src="{{ asset('js/vendor.js') }}" defer></script>
        <script src="{{ asset('js/frontend.js') }}" defer></script>
        <script src="https://kit.fontawesome.com/f3c2c1b87f.js" crossorigin="anonymous"></script>

        <style>
            .bg-soloc{
                background-color: #83ba8b !important;
            }

            .soloc-logo{
                height: 75px;
            }

            .badge-info, .badge-secondary{
                background-color: #e9ecef;
                color: black;
            }

            .btn-primary, .badge-primary{
                background-color: #0276d3;
                border-color: #0276d3;
            }

            .bd-placeholder-img {
                font-size: 1.125rem;
                text-anchor: middle;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            @media (min-width: 768px) {
                .bd-placeholder-img-lg {
                      font-size: 3.5rem;
                } 
            }
        </style>

        <script async src="https://www.googletagmanager.com/gtag/js?id={{ config("services.google.analytics.id") }}"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '{{ config("services.google.analytics.id") }}');
        </script>
    </head>

    <body>
        @include("layouts.public-header")

        @yield('content')

        @include("layouts.public-footer")

        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        
        {{-- <script>window.jQuery || document.write('<script src="/docs/4.4/assets/js/vendor/jquery.slim.min.js"><\/script>')</script><script src="/docs/4.4/dist/js/bootstrap.bundle.min.js" integrity="sha384-6khuMg9gaYr5AxOqhkVIODVIvm9ynTT5J4V1cfthmT+emCG6yVmEZsRHdxlotUnm" crossorigin="anonymous"></script> --}}
        @yield('scripts-body')
    </body>
</html>