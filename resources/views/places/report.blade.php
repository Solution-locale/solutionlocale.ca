@extends('layouts.public')

@section('page-title')
    Signalement d'une entreprise - {{ config('app.name', '') }}
@endsection

@section('content')
<main role="main">
    <div class="album py-5 bg-light">
        <div class="col-md-6 offset-md-3">

            <div class="card">
                <div class="card-header">
                    Signalement d'une erreur ou d'une modification
                </div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form method="POST" action="/entreprise/ajout/report/{{ $place->slug }}">
                        @csrf
                        @honeypot

                        <div class="form-group row">
                            <label for="name" class="col-md-3 col-form-label text-md-right">
                                Entreprise *
                            </label>
                            <div class="col-md-9">
                                <input id="entreprise" type="text"
                                    class="form-control"
                                    disabled
                                    value="{{ $place->name }}">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="name" class="col-md-3 col-form-label text-md-right">
                                Nom *
                            </label>
                            <div class="col-md-9">
                                <input id="name" type="text"
                                    class="form-control @error('name') is-invalid @enderror"
                                    name="name"
                                    value="{{ old('name') }}"
                                    required
                                    autocomplete="name"
                                    autofocus>

                                @error('name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{!! $message !!}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email"
                                   class="col-md-3 col-form-label text-md-right">
                                Courriel *
                            </label>

                            <div class="col-md-9">
                                <input id="email" type="text"
                                       class="form-control @error('email') is-invalid @enderror"
                                       name="email"
                                       value="{{ old('email') }}"
                                       required
                                       autocomplete="email"
                                       autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{!! $message !!}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="reason"
                                   class="col-md-3 col-form-label text-md-right">
                                Raison *
                            </label>

                            <div class="col-md-9">
                                <textarea id="reason"
                                        class="form-control @error('reason') is-invalid @enderror"
                                        required
                                        autocomplete="reason"
                                        name="reason"
                                        autofocus
                                        rows="5">{{ old('reason') }}</textarea>

                                @error('reason')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{!! $message !!}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <span class="col-md-5"></span>
                            <button type="submit" class="btn btn-primary">Envoyer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>
@endsection