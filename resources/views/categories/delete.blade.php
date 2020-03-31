@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="modal show" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ $category->name }}</h5>
                        </div>
                        <div class="modal-body">
                            <p>Voulez-vous vraiment supprimer &laquo; {{ $category->name }} &raquo; </p>
                        </div>
                        <div class="modal-footer">
                            <form action="{{ route('category.destroy', $category) }}" method="POST">
                                @csrf
                                @method('delete')

                                <button type="submit" class="btn btn-danger">Supprimer</button>
                            </form>
                            <a href="{{ route('categories') }}" class="btn btn-secondary">Annuler</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
@endsection
