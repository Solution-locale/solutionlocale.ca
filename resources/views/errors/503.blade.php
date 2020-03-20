@extends('errors::minimal')

@section('title', __('En maintenance!'))
@section('code', '503')
@section('message', __($exception->getMessage() ?: 'En maintenance, revenez sous peu!'))
