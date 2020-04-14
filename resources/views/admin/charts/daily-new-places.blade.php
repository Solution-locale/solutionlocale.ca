@extends('layouts.app')

@section('header_js')
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js" charset="utf-8"></script>
@endsection

@section("footer_js")
{!! $chart->script() !!}
@endsection

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Nouvelles fiches dans le temps</div>

                <div class="card-body">
                    {!! $chart->container() !!}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
