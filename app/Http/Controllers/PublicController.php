<?php

namespace App\Http\Controllers;

use App\Place;
use App\Region;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    
    public function index()
    {
        return view('index')->with(['places' => Place::where('is_approved', true)->get(), 'is_regional' => false]);
    }

    public function indexRegional(Region $region)
    {
        return view('index')->with(['places' => $region->places()->where('is_approved', true)->get(), 'region' => $region, 'is_regional' => true]);
    }
}
