@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Fiches à modérer pour {{ $region->name }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Nom</th>
                                <th scope="col">Date de l'ajout</th>
                                <th scope="col">Voir la fiche</th>
                                <th scope="col">Modifier la fiche</th>
                                <th scope="col">Accepter la fiche</th>
                                <th scope="col">Détruire la fiche</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($queue as $place)
                            <tr>
                                <th scope="row">{{ $place->name }}</th>
                                <td>{{ $place->created_at->tz('America/Montreal')->toDateTimeString() }}</td>
                                <td class="text-center">
                                    <a class="btn btn-outline-primary" href="{{ route("places.show", $place->slug) }}" role="button" target="_blank">👀</a>
                                </td>
                                <td class="text-center">
                                    <a class="btn btn-outline-warning" href="{{ route("places.edit", $place->slug) }}" role="button" target="_blank">✏️</a>
                                </td>
                                <td class="text-center">
                                    <a class="btn btn-outline-success" href="{{ route('moderation.approve', ['place' => $place->slug]) }}" role="button">✅</a>
                                </td>
                                <td class="text-center">
                                    <a class="btn btn-outline-danger" href="{{ route('moderation.delete', ['place' => $place->slug]) }}" role="button">🗑</a>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
