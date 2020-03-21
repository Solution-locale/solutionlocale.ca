@extends('layouts.public')

@section('content')
<main role="main">
  <div class="album py-5 bg-light">
      <div class="col-md-10 offset-md-1">
        @if(Illuminate\Support\Facades\Auth::check() && Illuminate\Support\Facades\Auth::user()->is_admin)
        <div class="card text-white bg-info mb-3">
          <div class="card-header">Ces options s'offrent à vous car vous êtes connectés comme administrateur.</div>
          <div class="card-body">
            <h5 class="card-title">Administration</h5>
            <ul>
              @if(!$place->is_approved)
              <li><b>Fiche est en attente de modération: </b> <a href="{{ route('places.approve', ['place' => $place->slug]) }}" class="text-dark">Cliquez ici pour l'approuver.</a></li>
              @endif
              <li><a href="{{ route('places.edit', ['place' => $place->slug]) }}" class="text-dark"
                >Modifier la fiche.</a></li>
              <li><a href="{{ route('places.delete', ['place' => $place]) }}" class="text-dark">Détruire la fiche</a></li>
            </ul>
          </div>
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
              <b>Adresse :</b> <a href="https://maps.google.com/?q={{ $place->complete_address }}" target="_blank">{{ $place->complete_address }}</a>
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
          <div class="card-footer">
            Si vous trouvez une erreur, ou désirez effectuer une modification, <a href="https://www.facebook.com/Solutionlocale/" target="_blank">contactez-nous par Facebook</a>!
          </div>
        </div>
      </div>
  </div>
</main>
@endsection
