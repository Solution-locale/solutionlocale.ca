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
        return view('index')->with([
            'places' => Place::where('is_approved', true)->get()->random(5),
            'is_regional' => false,
            'is_provincial' => false,
            'page_title' => config('app.name', ''),
            'is_search' => false,
        ]);
    }

    public function indexProvincial()
    {
        return view('index')->with([
            'places' => Place::where('is_approved', true)->get(), 
            'is_regional' => false, 
            'is_provincial' => true,
            'page_title' => 'Toute les régions - ' . config('app.name', ''),
            'is_search' => false,
        ]);
    }

    public function indexRegional(Region $region)
    {
        return view('index')->with([
            'places' => $region->places()->where('is_approved', true)->orderBy('name')->get(),
            'selectedRegion' => $region,
            'is_regional' => true,
            'is_provincial' => false,
            'page_title' => $region->getPageTitle(),
            'is_search' => false,
        ]);
    }

    public function indexRegionalCategories(Region $region, $category)
    {
        $category = Category::where('slug', $category)->first();
        $places = $category->places()->where('is_approved', true)->where('places.region_id', $region->id)->orderBy('name')->get();

        return view('index')->with([
            'places' => $places,
            'selectedRegion' => $region,
            'is_regional' => true,
            'category' => $category,
            'is_provincial' => false,
            'page_title' => $category->getPageTitle(),
            'is_search' => false,
        ]);
    }

    /**
     * Method for searching places.
     */
    public function indexSearch($region=null)
    {
        $q = request('q');
        if (!$region) {
            $places = Place::searchByKeyword($q);
        } else {
            $region = Region::where('slug', $region)->get()->first();
            $places = $region->searchPlacesByKeyword($q);
        }

        return view('index')->with([
            'places' => $places,
            'is_regional' => false,
            'is_provincial' => false,
            'page_title' => "{$q} - ".config('app.name', ''),
            'is_search' => true,
            'q' => $q,
        ]);
    }

}
