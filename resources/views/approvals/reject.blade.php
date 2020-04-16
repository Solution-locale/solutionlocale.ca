@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Rejet de la fiche : {{ $place->name }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('approvals.rejected', ['place' => $place->slug]) }}">
                        @csrf

                        <div class="form-group row">
                                <label for="reason" class="col-md-3 col-form-label text-md-right">
                                    Raison
                                </label>
                                <div class="col-md-9">
                                    <textarea id="reason"
                                        class="form-control @error('reason') is-invalid @enderror"
                                        name="reason">{{ old('reason') }}</textarea>

                                    @error('reason')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{!! $message !!}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                        <div class="form-group row">
                            <span class="col-md-5"></span>

                            <button type="submit" class="btn btn-primary">Rejeter la fiche</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection