@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Modifier {{ $category->name }}</div>

                    <div class="card-body">
                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif

                        <form method="POST" action="{{ route('category.update', $category) }}">
                            @csrf
                            @method('PUT')
                            @include('categories.form', [
                                'category' => $category,
                                'categories' => $categories,
                                'btn_text' => 'Envoyer'
                            ])
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
