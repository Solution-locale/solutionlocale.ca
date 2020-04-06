@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card text-white">
                <div class="card-header text-center">Signaler la fermeture</div>

                <div class="card-body">
                    <p>
                        Veuillez spécifier ci-dessous si
                        <a href="{{ route('places.show', ['place' => $place]) }}" class="text-dark">
                            {{ $place->name }}
                        </a> est présentement ouvert ou non.
                    </p>
                    <form method="POST" action="{{ route('moderation.closing', ['place' => $place->slug]) }}">
                        @csrf

                        <div class="form-group">
                            <label for="is_closed">
                                Établissement ouvert :
                            </label>
                            <select name="is_closed" id="is_closed" class="custom-select">
                                <option value="0" @if(!$place->is_closed) selected @endif>Ouvert</option>
                                <option value="1" @if($place->is_closed) selected @endif>Fermé</option>
                            </select>
                        </div>

                        <div class="form-group row">
                            <button type="submit" class="btn btn-primary">Sauvegarder</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
