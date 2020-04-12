@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Liste des utilisateurs</div>

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
                                <th>Rôles</th>
                                <th>Région(s)</th>
                                <th>Modifier</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($users as $user)
                            @if($user->hasRole('super_admin') && !Illuminate\Support\Facades\Auth::user()->hasRole('super_admin'))
                            @continue
                            @endif
                            <tr>
                                <th scope="row">{{ $user->name }}</th>
                                <td>{{ $user->roles->implode('name', ', ') }}</td>
                                <td>{{ $user->regions->isNotEmpty() ? $user->regions->implode('name', ', ') : "Aucune" }}</td>
                                <td class="text-center">
                                    <a class="btn btn-outline-warning" href="{{ route("users.edit", $user->id) }}" role="button" target="_blank">✏️</a>
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
