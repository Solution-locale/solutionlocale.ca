<header>
  <nav class="navbar navbar-expand-md navbar-dark bg-soloc">
    <a class="navbar-brand" href="/">
      <img src="/images/solution-locale-logo.png" alt="Solution locale" class="soloc-logo" />
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item @if(Route::currentRouteName() == 'public.index') active @endif">
          <a class="nav-link" href="{{ route('public.index') }}">Accueil</a>
        </li>
        <li class="nav-item @if(Route::currentRouteName() == 'map.show') active @endif">
          <a class="nav-link" href="{{ route('map.show') }}">Consulter la carte interactive</a>
        </li>
        <li class="nav-item @if(Route::currentRouteName() == 'places.create-public') active @endif">
          <a class="nav-link" href="{{ route('places.create-public') }}">Inscrire une entreprise</a>
        </li>
        <li class="nav-item @if(Route::currentRouteName() == 'public.team') active @endif">
          <a class="nav-link" href="{{ route('public.team') }}">Équipe et partenaires</a>
        </li>
        <li class="nav-item @if(Route::currentRouteName() == 'public.about') active @endif">
          <a class="nav-link" href="{{ route('public.about') }}">À propos</a>
        </li>
        @auth
        <li class="nav-item">
          <a href="{{ route('home') }}" class="nav-link">
            <i class="fas fa-user-astronaut" style="font-size: 1.5em"></i>
          </a>
        </li>
        @endauth
        <li class="nav-item">
          <a href="https://www.facebook.com/Solutionlocale/" class="nav-link" target="_blank">
            <i class="fab fa-facebook" style="font-size: 1.5em"></i>
          </a>
        </li>
        <li class="nav-item">
          <a href="https://github.com/Solution-locale/" class="nav-link" target="_blank">
            <i class="fab fa-github" style="font-size: 1.5em"></i>
          </a>
        </li>
      </ul>
      <form method="get" class="form-inline mt-2 mt-md-0" id="search-place-form" action="{{ route('recherche.index') }}">
        <input type="text" class="form-control mr-sm-2" id="q" name="q" placeholder="Nom, adresse ou ville" value="{{ $q ?? '' }}" aria-label="Recherche">
        <button class="btn btn-outline-light my-2 my-sm-0" type="submit">
          <i class="fas fa-search"></i>
        </button>
      </form>
    </div>
  </nav>
</header>
