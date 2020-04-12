@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Liste des places</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    
                    @if($places->count() != 0)
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Nom</th>
                                <th scope="col">Voir la fiche</th>
                                <th scope="col">Ouverture / fermeture</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($places as $place)
                            <tr>
                                <th scope="row">{{ $place->name }}</th>
                                <td class="text-center">
                                    <a class="btn btn-outline-primary" href="{{ route("places.show", $place->slug) }}" role="button" target="_blank">👀</a>
                                </td>
                                <td class="text-center">
                                    <a class="btn btn-outline-danger" href="{{ route('places.close', ['place' => $place->slug]) }}" role="button"><i class="fas fa-eye"></i></a>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                    @else
                    Aucune fiche fermées dans le système.
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
