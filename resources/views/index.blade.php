<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    {{-- <meta name="description" content=""> --}}
    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Bootstrap core CSS -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="https://kit.fontawesome.com/f3c2c1b87f.js" crossorigin="anonymous"></script>

    <style>
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
  </head>
  <body>
    <header>
  <div class="collapse bg-dark" id="navbarHeader">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 col-md-7 py-4">
          <h4 class="text-white">À propos</h4>
          <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut lacinia felis, vitae luctus lectus. Morbi pulvinar id odio id ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed porttitor vulputate leo at faucibus. Donec ut libero aliquam, vestibulum diam non, dignissim neque. Nulla facilisi. Maecenas ullamcorper est nulla. Suspendisse cursus, odio at sollicitudin egestas, augue enim scelerisque sem, eu finibus ligula erat eu ante. </p>
        </div>
        <div class="col-sm-4 offset-md-1 py-4">
          <h4 class="text-white">Contact</h4>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white">Follow on Twitter</a></li>
            <li><a href="#" class="text-white">Like on Facebook</a></li>
            <li><a href="#" class="text-white">Email me</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="navbar navbar-dark bg-dark shadow-sm">
    <div class="container d-flex justify-content-between">
      <a href="#" class="navbar-brand d-flex align-items-center">
        <i class="far fa-compass"></i>&nbsp;
        <strong>Solution locale</strong>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </div>
</header>

<main role="main">

  <section class="jumbotron text-center">
    <div class="container">
      <h1>Allô! C'est moi!</h1>
      <p class="lead text-muted">Ayons un texte, pour accrocher le monde comme il faut...</p>
      <p>
        <a href="#" class="btn btn-primary my-2">Inscrivez votre entreprise</a>
        <a href="#" class="btn btn-secondary my-2">Un autre bouton!</a>
      </p>
    </div>
  </section>

  <div class="album py-5 bg-light">
    <div class="container">

      <div class="row">
        <div class="col-md-12 text-center mb-5 h5">
          <a href="/" class="badge badge-info">Tout le Québec <span class="badge badge-light">{{ App\Place::count() }}</span></a>
          @foreach(App\Region::all() as $region)
          <a href="{{ route("public.index-region", ['region' => $region->slug]) }}" class="badge badge-info">{{ $region->name }} <span class="badge badge-light">{{ $region->places->count() }}</span></a>
          @endforeach
        </div>
      </div>

      @foreach($places as $place)
        <div class="col-md-8 offset-md-2">
          <div class="card mb-4 shadow-sm">
            {{-- <img src="/images/solutionlocale-placeholder.png" class="bd-placeholder-img card-img-top" alt="Solution locale"> --}}
            <div class="card-body">
              <h4 class="card-title text-center">{{ $place->name }}</h4>
              <h5 class="text-center"><i class="fas fa-map-marker-alt"></i> {{ $place->region->name }}, {{ $place->subRegion }}</h5>

              <div class="container mt-3">
                <div class="row">
                  <div class="col">
                    <p class="text-center">
                      <i class="fas fa-shopping-cart"></i> Méthode d'acquisition
                    </p>
                  </div>
                  <div class="col">
                    <p class="text-center">
                      <i class="fas fa-tags"></i> Catégories
                    </p>
                  </div>
                </div>
              </div>

              {{-- @if($place->delivery->isNotEmpty())<p class="card-text"><i class="fas fa-shopping-cart"></i> {{ $place->delivery->implode('name', ', ') }}</p>@endif --}}

              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  @auth()
                  <a class="btn btn-sm btn-outline-secondary" href="{{ route('places.edit', ['place' => $place->slug]) }}">Edit</a>
                  @endauth
                </div>
              </div>
            </div>
          </div>
        </div>
      @endforeach
    </div>
  </div>

</main>

<footer class="text-muted">
  <div class="container">
    <p class="float-right">
      <a href="#">Retour en haut</a>
    </p>
    <p>Du texte et du copyright &copy; à nous pis toute.</p>
  </div>
</footer>
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
      <script>window.jQuery || document.write('<script src="/docs/4.4/assets/js/vendor/jquery.slim.min.js"><\/script>')</script><script src="/docs/4.4/dist/js/bootstrap.bundle.min.js" integrity="sha384-6khuMg9gaYr5AxOqhkVIODVIvm9ynTT5J4V1cfthmT+emCG6yVmEZsRHdxlotUnm" crossorigin="anonymous"></script></body>
</html>
