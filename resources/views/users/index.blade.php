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
                                <th class="text-center">Notifiable</th>
                                <th class="text-center">Journal d'activité</th>
                                <th class="text-center">Modifier</th>
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
                                <td class="text-center">{!! $user->is_notifiable ? '<i class="far fa-bell text-success"></i>' : '<i class="far fa-bell-slash text-danger"></i>' !!}</td>
                                <td class="text-center">
                                    <a class="btn btn-outline-dark @if($user->actions->isEmpty()) disabled @endif" href="{{ route("activity-log.by-user", $user->id) }}" role="button"><i class="fas fa-clipboard-list"></i></a>
                                </td>
                                <td class="text-center">
                                    <a class="btn btn-outline-warning" href="{{ route("users.edit", $user->id) }}" role="button">✏️</a>
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
