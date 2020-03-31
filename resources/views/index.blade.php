@extends('layouts.public')

@section('page-title')
{{ $page_title ?? '' }}
@endsection

@section('content')
<main role="main">
  @if(!$is_regional)
  <section class="jumbotron text-center">
    <div class="container">
      <h1>Répertoire de ressources locales<br>en contexte de distanciation sociale</h1>
      <p class="lead text-muted">Une initiative citoyenne, en collaboration<br>avec plusieurs partenaires locaux</p>
      <p>
        <a href="{{ route('places.create-public') }}" class="btn btn-primary my-2">Inscrivez une entreprise</a>
        <a href="{{ route('map.show') }}" class="btn btn-primary my-2"><i class="fas fa-map-marker-alt"></i> Voir la carte interactive</a>
      </p>
    </div>
  </section>
  @endif

  <div class="album py-5 bg-light">
    <div class="container">

    @if($is_regional)
    <div class="row flex-column-reverse flex-md-row">
      <div class="col-content col-12 col-md-7 col-lg-8">
      @endif

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
        <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2 text-center mb-5 h5">
        @include('layouts.places-sorter')
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

      @if($is_regional)
        </div> <!-- end col place -->
        <div class="col-sidebar col-12 col-md-5 col-lg-4 mb-5 h5">
          
          <div class="mt-5">
          @include('layouts.places-sorter')
          </div>

          <button class="btn btn-secondary d-sm-block d-md-none mb-2" type="button" data-toggle="collapse" data-target="#categoriesCollapse" aria-expanded="false" aria-controls="categoriesCollapse">
            Afficher les catégories
          </button>

          <div class="collapse dont-collapse-sm" id="categoriesCollapse">
          <a href="{{ route('public.index-region', ['region' => $selectedRegion]) }}" class="badge badge-info mb-2">Toutes les catégories <span class="badge badge-light ">{{ App\Place::where('region_id', $selectedRegion->id)->where('is_approved', true)->count() }}</span></a>
          <ul class="cat-list">
            @foreach($categories as $cat)
                <li class="d-flex {{ !empty($category) && $category->slug === $cat->slug ? 'active' : '' }}"><i class="fas fa-caret-right align-self-center"></i>
                  <a href="{{ route("public.index-region-category", ['region' => $selectedRegion, 'category' => $cat->slug]) }}" class="badge flex-grow-1">{{ $cat->name }} <span class="badge badge-light">{{ $cat->places()->where('region_id', $selectedRegion->id)->count() }}</span></a>
                    
                </li>
                <ul>
                  @foreach($cat->children as $category_children)
                      <li class="d-flex {{ !empty($category) && $category->slug === $category_children->slug ? 'active' : '' }}"><i class="fas fa-caret-right align-self-center"></i>
                      <a href="{{ route("public.index-region-category", ['region' => $selectedRegion, 'category' => $category_children->slug]) }}" class="badge flex-grow-1">{{ $category_children->name }} <span class="badge badge-light">{{ $category_children->places()->where('region_id', $selectedRegion->id)->count() }}</span></a>
                      </li>
                  @endforeach
              </ul>
            @endforeach
          </ul>
          </div>
         
      </div>
    </div> <!-- end row -->
    @endif
    </div>
  </div>
</main>
@endsection

@section('scripts-body')
  <script src="{{ asset('js/places-sorter.js') }}"></script>
@endsection