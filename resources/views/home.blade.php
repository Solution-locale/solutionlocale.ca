@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Statistiques</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <ul>
                        <li>Nombre total de fiches, peu importe le status: {{ App\Place::count() }}</li>
                        @if(App\Place::where('is_approved', false)->get()->isNotEmpty())
                        <li>Total de fiches en attente d'approbation: {{ App\Place::where('is_approved', false)->whereNull('rejection_id')->count() }}.</li>
                        <li>Total de fiches rejetées: {{ App\Place::whereNotNull('rejection_id', false)->count() }}.</li>
                        @endif
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
