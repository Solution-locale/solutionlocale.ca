<?php

namespace App\Http\Controllers;

use App\Category;
use App\Place;
use App\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class PublicController extends Controller
{
    
    public function index()
    {
        return view('index')->with(['places' => Place::where('is_approved', true)->get(), 'is_regional' => false]);
    }

    public function indexRegional(Region $region)
    {
        
        return view('index')->with(['places' => $region->places()->where('is_approved', true)->get(), 'selectedRegion' => $region, 'is_regional' => true]);
    }

    public function indexRegionalCategories(Region $region, $category)
    {
        $category = Category::where('slug', $category)->first();
        $places = $category->places()->where('is_approved', true)->where('places.region_id', $region->id)->get();
        
        return view('index')->with(['places' => $places, 'selectedRegion' => $region, 'is_regional' => true, 'category' => $category]);
    }
}
