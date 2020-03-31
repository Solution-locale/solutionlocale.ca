@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            @foreach($queue as $region => $places)
            <div class="card mb-3">
                <div class="card-header">{{ $region }}</div>

                <div class="card-body">
                    <ul>
                        @foreach($places as $place)
                        <li><b>{{ $place->name }}</b> :
                            <ul>
                                <li>
                                    <a href="{{ route('places.show', ['place' => $place]) }}">Voir la fiche</a>
                                </li>
                                <li>
                                    <a href="{{ route('places.edit', ['place' => $place]) }}">Modifier la fiche</a>
                                </li>
                                <li>
                                    <a href="{{ route('places.delete', ['place' => $place]) }}">Détruire la fiche</a>
                                </li>
                            </ul>
                        </li>
                        @endforeach
                    </ul>
                </div>

            </div>
            @endforeach
        </div>
    </div>
</div>
@endsection
