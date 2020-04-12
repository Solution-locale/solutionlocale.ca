@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Modifier {{ $user->name }}</div>
                    <div class="card-body">
                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif

                        <form method="POST" action="{{ route('users.update', ['user' => $user]) }}">
                            @csrf
                            @method('PUT')

                            <div class="form-group row">
                                <label for="name" class="col-md-3 col-form-label text-md-right">Nom *</label>

                                <div class="col-md-9">
                                    <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ $user->name }}" required autocomplete="name" autofocus>

                                    @error('name')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email" class="col-md-3 col-form-label text-md-right">Adresse courriel *</label>

                                <div class="col-md-9">
                                    <input id="email" type="text" class="form-control @error('email') is-invalid @enderror" required name="email" value="{{ $user->email }}" autocomplete="email" autofocus>

                                    @error('email')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="role" class="col-md-3 col-form-label text-md-right">Rôles *</label>
                                <div class="col-md-9">
                                    <select multiple="multiple" name="roles[]" id="roles">
                                        @foreach(Spatie\Permission\Models\Role::all()->pluck('name') as $role)
                                        <option value="{{ $role }}"
                                            @foreach($user->roles->pluck('name') as $r)
                                                @if($role === $r)
                                                    selected
                                                @endif
                                            @endforeach
                                            >{{$role}}</option>
                                        @endforeach
                                    </select>

                                    @error('roles')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{!! $message !!}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="regions" class="col-md-3 col-form-label text-md-right">Région</label>
                                <div class="col-md-9">
                                    <select multiple="multiple" name="regions[]" id="regions">
                                        @foreach(App\Region::all() as $region)
                                        <option value="{{ $region->id }}"
                                            @if($user->regions->contains($region))
                                                selected
                                            @endif>
                                            {{$region->name}}
                                        </option>
                                        @endforeach
                                    </select>

                                    <span class="form-text text-muted" role="alert">
                                        <strong>Aucune, ou plusieurs, régions.</strong>
                                    </span>

                                    @error('regions')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{!! $message !!}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <span class="col-md-5"></span>

                                <button type="submit" class="btn btn-primary">Sauvegarder</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
