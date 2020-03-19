@extends('layouts.public')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            @if($places->isEmpty())
            <div class="alert alert-warning" role="alert">
              Il n'y a toujours aucune inscription dans cette catégorie.
            </div>
            @endif

            <div class="card-deck">
                @foreach($places as $place)
                <div class="card">
                    {{-- <img src="..." class="card-img-top" alt="..."> --}}
                    <div class="card-body">
                        <h5 class="card-title">{{ $place->name }}</h5>
                        
                        <p><address><i class="fas fa-map-marker-alt"></i> {{ $place->address }}, {{ $place->city }} {{ $place->postalCode }}</address></p>
                        @if($place->phoneNumber !== null)<p><i class="fas fa-phone"></i> {{ $place->phoneNumber }}</p>@endif
                        @if($place->additionnalPhoneNumber !== null)<p><i class="fas fa-phone"></i> {{ $place->additionnalPhoneNumber }}</p>@endif
                        @if($place->email !== null)<p><i class="fas fa-at"></i> {{ $place->email }}</p>@endif
                        @if($place->url !== null)<p><i class="fas fa-desktop"></i> {{ $place->url }}</p>@endif
                        <p class="card-text"><i class="fas fa-info-circle"></i> {{ $place->instructions }}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">{{ $place->region }}</small>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
@endsection
