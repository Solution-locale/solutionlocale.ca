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
        return view('index', ['places' => Place::where('is_approved', true)->get()->random(5), 'is_regional' => false,  'is_provincial' => false]);
    }

    public function indexProvincial()
    {
        return view('index')->with(['places' => Place::where('is_approved', true)->get(), 'is_regional' => false, 'is_provincial' => true]);
    }

    public function indexRegional(Region $region)
    {
        return view('index')->with(['places' => $region->places()->where('is_approved', true)->orderBy('name')->get(), 'selectedRegion' => $region, 'is_regional' => true,  'is_provincial' => false]);
    }

    public function indexRegionalCategories(Region $region, $category)
    {
        $category = Category::where('slug', $category)->first();
        $places = $category->places()->where('is_approved', true)->where('places.region_id', $region->id)->orderBy('name')->get();

        return view('index')->with(['places' => $places, 'selectedRegion' => $region, 'is_regional' => true, 'category' => $category,  'is_provincial' => false]);
    }
}
