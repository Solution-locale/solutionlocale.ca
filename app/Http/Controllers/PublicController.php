<?php

namespace App\Http\Controllers;

use App\Place;
use App\Region;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function index()
    {
        return view('index')->with(['places' => Place::all()]);
    }

    public function index_regional(Region $region)
    {
        return view('index')->with(['places' => $region->places]);
    }
}
