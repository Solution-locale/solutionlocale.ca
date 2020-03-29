@extends('layouts.public')

@section('content')
<main role="main">
  <div class="album py-5 bg-light">
      <div class="col-md-10 offset-md-1">
        @can("do-moderation")
        <div class="card border-info mb-1">
          <div class="card-header">Options de modération</div>
          <div class="card-body text-info">
            <div class="btn-group" role="group" aria-label="Basic example">
              <a class="btn btn-outline-primary" href="{{ route("places.edit", $place->slug) }}" role="button" target="_blank">✏️</a>
              @if(!$place->is_approved)
              <a class="btn btn-outline-primary" href="{{ route('moderation.approve', ['place' => $place->slug]) }}" role="button">✅</a>
              @endif
              <a class="btn btn-outline-danger" href="{{ route('moderation.delete', ['place' => $place->slug]) }}" role="button">🗑</a>
            </div>
          </div>
        </div>
        @endcan
        <div class="card">
          <div class="card-header">
            <h1>{{ $place->name }}</h1>
            <h3>{{ $place->region->name }}</h3>
          </div>
          <div class="card-body">
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

            @if (!$place->hide_address)
              <p class="card-text">
                <b>Adresse :</b> <a href="https://maps.google.com/?q={{ $place->complete_address }}" target="_blank">{{ $place->complete_address }}</a>
              </p>
            @endif

            <p class="card-text">
              <b>Téléphone: </b> {{ $place->phoneNumber }}
            </p>

            <p class="card-text">
              <b>Courriel: </b> {{ $place->email }}
            </p>

            <p class="card-text">
              <b>Site web: </b> <a href="{{ $place->url }}" target="_blank">{{ $place->url }}</a>
            </p>

            <p class="card-text text-right">
              Nombre de vue sur la fiche: {{ $place->views }}
            </p>
          </div>
          <div class="card-footer">
            Si vous trouvez une erreur, ou désirez effectuer une modification, <a href="https://www.facebook.com/Solutionlocale/" target="_blank">contactez-nous par Facebook</a>!
          </div>
        </div>
      </div>
  </div>
</main>
@endsection
