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
                        <li>Nombre de catégories: {{ App\Category::count() }}</li>
                        <li>Nombre de places: {{ App\Place::count() }}</li>
                        <li>En attente d'approvation: {{ App\Place::where('is_approved', false)->count() }}. <a href="#">Effectuer la modération d'entreprises par ici.</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
