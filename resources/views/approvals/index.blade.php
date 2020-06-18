@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row row-cols-1 row-cols-md-2">
        @foreach(\Solutionlocale\Commons\Models\Region::all() as $region)
        <div class="col mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ $region->name }}</h5>
                    <p class="card-text">
                        Il y a <b>{{ $region->places()->where('is_approved', false)->whereNull('rejection_id')->count() }}</b> fiche(s) en attente de modération dans cette région.
                    </p>
                    <p class="card-text">
                        <a class="btn btn-outline-primary" href="{{ route("approvals.show", $region->slug) }}" role="button">Accéder aux fiches à modérer</a>
                    </p>
                </div>
            </div>
        </div>
        @endforeach
    </div>
</div>
@endsection
