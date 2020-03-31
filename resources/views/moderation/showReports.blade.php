@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Signalements à modérer</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Entreprise</th>
                                <th scope="col">Nom et courriel du signaleur</th>
                                <th scope="col">Raison du signalement</th>
                                <th scope="col">Date de l'ajout</th>
                                <th scope="col">Voir la fiche</th>
                                <th scope="col">Modifier la fiche</th>
                                <th scope="col">Détruire la fiche</th>
                                <th scope="col">Archiver le signalement</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($reports as $report)
                            <tr>
                                <th scope="row">{{ $report->place->name }}</th>
                                <td>{{ $report->name }} <br/> {{ $report->email }}</td>
                                <td>{{ $report->reason }}</td>
                                <td>{{ $report->created_at->tz('America/Montreal')->toDateTimeString() }}</td>
                                <td class="text-center">
                                    <a class="btn btn-outline-primary" href="{{ route("places.show", $report->place->slug) }}" role="button" target="_blank">👀</a>
                                </td>
                                <td class="text-center">
                                    <a class="btn btn-outline-warning" href="{{ route("places.edit", $report->place->slug) }}" role="button" target="_blank">✏️</a>
                                </td>
                                <td class="text-center">
                                    <a class="btn btn-outline-danger" href="{{ route('moderation.delete', ['place' => $report->place->slug]) }}" role="button">🗑</a>
                                </td>
                                <td class="text-center">
                                    <form method="POST" action="{{ route('moderation.archiveReport', ['report' => $report->id]) }}">
                                        @csrf
                                        @honeypot

                                        <button class="btn btn-outline-secondary" type="submit" role="button">📁</a>
                                    </form>
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
