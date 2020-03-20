@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            @foreach($queue as $region => $places)
            <div class="card">
                <div class="card-header">{{ $region }}</div>

                <div class="card-body">
                    <ul>
                        @foreach($places as $place)
                        <li><a href="{{ route('places.show', ['place' => $place->slug]) }}">Voir la fiche de {{ $place->name }}</a>. <a href="{{ route('places.edit', ['place' => $place->slug]) }}">Modifier la fiche de {{ $place->name }}</a></li>
                        @endforeach
                    </ul>
                </div>
                
            </div>
            @endforeach
        </div>
    </div>
</div>
@endsection
