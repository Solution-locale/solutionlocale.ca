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

      <div class="row" id="region-list">
      <div class="col-md-12 text-center mb-5 h5">
          <h3 class="mb-4">Filtrer par région</h3>
          <a href="{{ route("recherche.index") }}{{ $q ? '?q='.$q : '' }}" class="badge badge-info">Tout le Québec <span class="badge badge-light">{{ App\Place::countByKeyword($q) }}</span></a>
          @foreach(App\Region::all() as $region)
          <a href="{{ route("recherche.index-region", ['region' => $region->slug]) }}{{ $q ? '?q='.$q : '' }}" class="badge badge-info">{{ $region->name }} <span class="badge badge-light">{{ $region->countPlacesByKeyword($q) }}</span></a>
          @endforeach
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
