@extends('layouts.public')

@section('page-title')
{{ $page_title ?? '' }}
@endsection

@section('styles-head')
  @if(request('vue', '') === 'compact')
    <link href="{{ asset('css/index-print.css') }}" rel="stylesheet">
  @endif
@endsection

@section('content')
<main role="main">
  @if (session('status'))
  <div class="alert alert-danger mt-3 text-center col-md-8 offset-md-2" role="alert">
      <b>{{ session('status') }}</b>
  </div>
  @endif

  <div class="album py-5 bg-light">
    <div class="container">

      <h2 class="text-center mb-2">{{ $selectedRegion->name }} : {{ $category->name }}</h2>
      <h6 class="text-center mb-5"><a href="{{ route("regions.index-provincial") }}">Retour à toutes les régions</a></h6>

      <div class="row" id="region-list">
        <div class="col-md-12 text-center mb-5 h5">
          <a href="{{ route('regions.index-region', ['region' => $selectedRegion]) }}" class="badge badge-info">Toutes catégories <span class="badge badge-light">{{ \Solutionlocale\Commons\Models\Place::where('region_id', $selectedRegion->id)->where('is_approved', true)->count() }}</span></a>
            @foreach($categories as $category)
                @if ($category->places()->where('region_id', $selectedRegion->id)->count() > 0)
                    <a href="{{ route("regions.index-region-category", ['region' => $selectedRegion, 'category' => $category->slug]) }}" class="badge badge-info">{{ $category->name }} <span class="badge badge-light">{{ $category->places()->where('region_id', $selectedRegion->id)->count() }}</span></a>
                @endif
            @endforeach
        </div>
      </div>

      @if (session('status'))
          <div class="alert alert-success text-center" role="alert">
              {{ session('status') }}
          </div>
      @endif

      @if($places->isEmpty())
      <div class="alert alert-info">Toujours aucune entreprise enregistrée dans cette région! Vous en connaissez une? <b><a href="{{ route('places.create-public') }}">Inscrivez-là!</a></b></div>
      @endif

      <div class="col-md-12" id="result-actions">
        <div class="row">
          <div class="col-md-6">
            @include('layouts.places-sorter')
          </div>
          <div class="col-md-4 offset-md-2">
            @include('layouts.places-view-selector')
          </div>
        </div>
      </div>

      @include($viewTemplate, ['places' => $places])

    </div>
  </div>
</main>
@endsection

@section('scripts-body')
  <script src="{{ asset('js/places-sorter.js') }}"></script>
@endsection
