@extends('layouts.public')

@section('content')
<main role="main">
  <div class="album py-5 bg-light">
      <div class="col-md-10 offset-md-1">
        @if(!$place->is_approved)
        <div class="alert alert-info" role="alert">
          <b><a href="{{ route('places.approve', ['place' => $place->slug]) }}">Cette fiche est en attente de modération. Cliquez ici pour l'approuver.</a></b>
        </div>
        @endif
        @if(Illuminate\Support\Facades\Auth::user()->is_admin)
        <div class="alert alert-info" role="alert">
          <b><a href="{{ route('places.edit', ['place' => $place->slug]) }}">Modifier la fiche.</a></b>
        </div>
        @endif
        <div class="card">
          <div class="card-body">
            <h1>{{ $place->name }}</h1>

            <h3>
              @foreach($place->delivery as $delivery)
              <span class="badge badge-primary">{{ $delivery->name }}</span>
              @endforeach
            </h3>

            <h4>
              @foreach($place->categories as $category)
              <span class="badge badge-secondary">{{ $category->name }}</span>
              @endforeach
            </h4>

            <h6>
              @foreach($place->types as $type)
              <em>{{ $type->name }}</em>.
              @endforeach
            </h6>

            <p class="card-text mt-5">
              <b>Zone de livraison: </b> {{ $place->deliveryZone }}
            </p>

            <p class="card-text">
              <b>Addresse :</b> <a href="https://maps.google.com/?q={{ $place->complete_address }}" target="_blank">{{ $place->complete_address }}</a>
            </p>

            <p class="card-text">
              <b>Téléphone: </b> {{ $place->phoneNumber }}
            </p>

            <p class="card-text">
              <b>Courriel: </b> {{ $place->email }}
            </p>

            <p class="card-text">
              <a href="{{ $place->url }}" target="_blank">{{ $place->url }}</a>
            </p>
          </div>
        </div>
      </div>
  </div>
</main>
@endsection
