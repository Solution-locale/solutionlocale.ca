@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Fiches rejetés</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    @if($places->isNotEmpty())
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Nom</th>
                                <th scope="col">Date de création de la fiche</th>
                                <th scope="col">Date du rejet</th>
                                <th scope="col">Rejeteur</th>
                                <th scope="col">Raisons</th>
                                <th scope="col">Annuler le rejet</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($places as $place)
                            <tr>
                                <th scope="row"><a href="{{ route('places.show', ['place' => $place]) }}">{{ $place->name }}</a></th>
                                <td>{{ $place->created_at->tz('America/Montreal')->toDateTimeString() }}</td>
                                <td>{{ $place->rejection->created_at->tz('America/Montreal')->toDateTimeString() }}</td>
                                <td>
                                    {{ $place->rejection->user->name }}
                                </td>
                                <td>
                                    {{ $place->rejection->reason }}
                                </td>
                                <td class="text-center">
                                    <a class="btn btn-outline-success" href="{{ route('approvals.cancel-rejection', ['place' => $place->slug]) }}" role="button">👍</a>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                    @else
                    Aucune fiche rejetée pour l'instant.
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
