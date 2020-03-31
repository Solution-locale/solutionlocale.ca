@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Ajouter une nouvelle catégorie</div>

                    <div class="card-body">
                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif

                        <form method="POST" action="{{ route('categories.store') }}">
                            @csrf

                            @include('categories.form', [
                                'category' => new App\Category,
                                'btn_text' => 'Envoyer'
                            ])

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
