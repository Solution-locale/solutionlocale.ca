@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card text-white bg-danger">
                <div class="card-header text-center">🚓 ☢️ 🚒 ☢️ <b>ATTENTION</b> 🚓 ☢️ 🚒 ☢️</div>

                <div class="card-body">
                    <p>Vous êtes sur le point de détruire la fiche de <a href="{{ route('places.show', ['place' => $place]) }}" class="text-dark">{{ $place->name }}</a>.</p>
                    <p><b>Cette action est irréversible</b>. Si vous êtes certain de se que vous faites, cliquez sur le bouton ci-dessous!</p>
                    <form method="POST" action="{{ route('places.destroy', ['place' => $place->slug]) }}">
                        @csrf
                        @method('delete')

                        <div class="form-group row">
                            <span class="col-md-5"></span>

                            <button type="submit" class="btn btn-dark">Détruire la fiche</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
