@extends('layouts.public')

@section('content')
<main role="main">
  @if(!$is_regional)
  <section class="jumbotron text-center">
    <div class="container">
      <h1>Répertoire de ressources locales<br>en contexte de distanciation sociale</h1>
      <p class="lead text-muted">Une initiative citoyenne, en collaboration<br>avec plusieurs partenaires locaux</p>
      <p>
        <a href="{{ route('places.create-public') }}" class="btn btn-primary my-2">Inscrivez une entreprise</a>
      </p>
    </div>
  </section>
  @endif

  <div class="album py-5 bg-light">
    <div class="container">

      @if($is_regional)
      <h1 class="text-center mb-2">{{ $selectedRegion->name }}</h1>
      @endif

      @if(isset($category))
      <h2 class="text-center mb-5">{{ $category->name }}</h1>
      @endif      

      <div class="row">
        @if(!$is_regional)
        <div class="col-md-12 text-center mb-5 h5">
          <h3 class="mb-4">Filtrer par région</h3>
          <a href="{{ route("public.index-provincial") }}" class="badge badge-info">Tout le Québec <span class="badge badge-light">{{ App\Place::where('is_approved', true)->count() }}</span></a>
          @foreach(App\Region::all() as $region)
          <a href="{{ route("public.index-region", ['region' => $region->slug]) }}" class="badge badge-info">{{ $region->name }} <span class="badge badge-light">{{ $region->places()->where('is_approved', true)->count() }}</span></a>
          @endforeach
        </div>
        @else
        <div class="col-md-12 text-center mb-5 h5">
          <a href="{{ route('public.index-region', ['region' => $selectedRegion]) }}" class="badge badge-info">Toutes catégories <span class="badge badge-light">{{ App\Place::where('region_id', $selectedRegion->id)->where('is_approved', true)->count() }}</span></a>
          @foreach(App\Category::all() as $category)
            <a href="{{ route("public.index-region-category", ['region' => $selectedRegion, 'category' => $category->slug]) }}" class="badge badge-info">{{ $category->name }} <span class="badge badge-light">{{ $category->places()->where('region_id', $selectedRegion->id)->count() }}</span></a>
          @endforeach
        </div>
        @endif
      </div>

      @if (session('status'))
          <div class="alert alert-success text-center" role="alert">
              {{ session('status') }}
          </div>
      @endif

      @if($places->isEmpty())
      <div class="alert alert-info">Toujours aucune entreprise enregistrée dans cette région! Vous en connaissez une? <b><a href="{{ route('places.create-public') }}">Inscrivez-là!</a></b></div>
      @endif

      @if(!$is_regional && !isset($category) && !$is_provincial)
      <h3 class="mb-4 text-center">Quelques exemples</h3>
      @endif

      @foreach($places as $place)
        @include('index-place-cards', ['place' => $place])
      @endforeach
    </div>
  </div>
</main>
@endsection
