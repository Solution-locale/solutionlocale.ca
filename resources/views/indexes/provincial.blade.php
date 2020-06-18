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

      <h1 class="text-center mb-4">Toutes les régions</h1>

      <div class="col-md-12 text-center mb-5 h5">
          <h5 class="mb-2">Filtrer par région</h5>
          <a href="{{ route("regions.index-provincial") }}" class="badge badge-info">Toutes les régions <span class="badge badge-light">{{ \Solutionlocale\Commons\Models\Place::where('is_approved', true)->count() }}</span></a>
          @foreach(\Solutionlocale\Commons\Models\Region::all() as $region)
          <a href="{{ route("regions.index-region", ['region' => $region->slug]) }}" class="badge badge-info">{{ $region->name }} <span class="badge badge-light">{{ $region->places()->where('is_approved', true)->count() }}</span></a>
          @endforeach
        </div>

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
