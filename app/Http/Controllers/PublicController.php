<?php

namespace App\Http\Controllers;

use App\Category;
use App\Place;
use App\Region;
use App\Utils\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class PublicController extends Controller
{
    public function index()
    {
        $sort = Utils::getSortColumn(request('trierpar', ''));
        return view('index')->with([
            'places' => Place::where('is_approved', true)->orderBy($sort['col'], $sort['order'])->get()->random(5),
            'is_regional' => false,
            'is_provincial' => false,
            'page_title' => config('app.name', '')
        ]);
    }

    public function indexProvincial()
    {
        $sort = Utils::getSortColumn(request('trierpar', ''));
        return view('index')->with([
            'places' => Place::where('is_approved', true)->orderBy($sort['col'], $sort['order'])->get(),
            'is_regional' => false, 
            'is_provincial' => true,
            'page_title' => 'Toute les régions - ' . config('app.name', '')
        ]);
    }

    public function indexRegional(Region $region)
    {
        $sort = Utils::getSortColumn(request('trierpar', ''));
        $categories = Category::where('parent_id', '=', null)->get();
        return view('index')->with([
            'places' => $region->places()->where('is_approved', true)->orderBy($sort['col'], $sort['order'])->get(),
            'selectedRegion' => $region,
            'is_regional' => true,
            'is_provincial' => false,
            'page_title' => $region->getPageTitle(),
            'categories' => $categories,
            'category' => null
        ]);
    }

    public function indexRegionalCategories(Region $region, $category)
    {
        $category = Category::where('slug', $category)->first();
        $sort = Utils::getSortColumn(request('trierpar', ''));
        $places = $category->places()->where('is_approved', true)->where('places.region_id', $region->id)->orderBy($sort['col'], $sort['order'])->get();
        $categories = Category::where('parent_id', '=', null)->get();
        return view('index')->with([
            'places' => $places,
            'selectedRegion' => $region,
            'is_regional' => true,
            'category' => $category,
            'is_provincial' => false,
            'page_title' => $category->getPageTitle(),
            'categories' => $categories
        ]);
    }

}
