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
  
  <section class="jumbotron text-center">
    <div class="container">
      <h1>Répertoire de ressources locales<br>en contexte de distanciation sociale</h1>
      <p class="lead text-muted">Une initiative citoyenne, en collaboration<br>avec plusieurs partenaires locaux</p>
      <p>
        <a href="{{ route('places.create-public') }}" class="btn btn-primary my-2">Inscrivez une entreprise</a>
        <a href="{{ route('map.show') }}" class="btn btn-primary my-2"><i class="fas fa-map-marker-alt"></i> Voir la carte interactive</a>
        <a href="{{ route('regions.index-provincial') }}" class="btn btn-primary my-2"> Consulter par régions</a>
      </p>
    </div>
  </section>

  <div class="album py-5 bg-light">
    <div class="container">
      @if (session('status'))
          <div class="alert alert-success text-center" role="alert">
              {{ session('status') }}
          </div>
      @endif

      <h3 class="mb-4 text-center">Quelques exemples</h3>

      @include($viewTemplate, ['places' => $places])

    </div>
  </div>
</main>
@endsection

@section('scripts-body')
  <script src="{{ asset('js/places-sorter.js') }}"></script>
@endsection
