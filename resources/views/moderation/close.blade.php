@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card text-white bg-info">
                <div class="card-header text-center">{{ $place->is_closed ? "Réouverture de l'entreprise" : "Fermeture temporaire d'entreprise" }}</div>

                <div class="card-body">
                    <p>Vous êtes sur le point {{ $place->is_closed ? "d'ouvrir" : "de fermer" }} la fiche de <a href="{{ route('places.show', ['place' => $place]) }}" class="text-dark">{{ $place->name }}</a>.</p>
                    <p>Cette {{ $place->is_closed ? "remettra disponible la fiche dans les résultats" : "fermeture cachera effectivement la fiche des résultats de recherche" }}. Pour {{ $place->is_closed ? "la fermer de nouveau" : "la réactiver" }}, simplement cliquer sur le bouton correspondant sur la fiche!</p>
                    <form method="POST" action="{{ route('places.closing', ['place' => $place->slug]) }}">
                        @csrf

                        <div class="form-group row">
                            <span class="col-md-5"></span>

                            <button type="submit" class="btn btn-dark">{{ $place->is_closed ? "Ouvrir" : "Fermer" }} la fiche</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection