@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Journal des actions sur les fiches des 30 dernières journées</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    @if($activities->isNotEmpty())
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Entrepris par</th>
                                <th>Action</th>
                                <th>Nom d'entreprise</th>
                                <th>Changements, si applicable</th>
                                <th>Quand</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($activities as $activity)
                            <tr>
                                <th scope="row">{{ isset($activity->causer) ? $activity->causer->name : "" }}</th>
                                <td>{{ $activity->description }}</td>
                                <td>{{ isset($activity->subject) ? $activity->subject->name : $activity->properties['attributes']['name'] }}</td>
                                <td>
                                    @if(isset($activity->properties['old']))
                                        @foreach($activity->properties['old'] as $key => $value)
                                            <b>{{ $key }}:</b> {{ $value }} -> {{ $activity->properties['attributes'][$key] }}<br>
                                        @endforeach
                                    @endif
                                </td>
                                <td>
                                    {{ $activity->created_at->tz('America/Montreal')->toDatetimeString() }}
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                    @else
                    Aucune activité enregistrée.
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
