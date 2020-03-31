@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <ul>
                @foreach($categories as $category)
                    <li>
                        {{ $category->name }}
                        <div class="btn-group btn-group-sm"
                             role="group"
                             aria-label="Actions for {{ $category->name }}">
                            <a
                                href="{{ route('category.edit', $category) }}"
                                class="btn btn-dark"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Edit {{$category->name }}">
                                <i class="fa fa-edit" aria-hidden="true"></i>
                            </a>
                            <a
                                href="{{ route('category.delete', $category) }}"
                                class="btn btn-dark btn-dangerHover"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Delete {{ $category->name }}">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                            </a>
                        </div>
                    </li>
                @endforeach
                </ul>
        </div>
    </div>
@endsection
