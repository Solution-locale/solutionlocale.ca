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
        return view('index', ['places' => Place::where('is_approved', true)->orderBy($sort['col'], $sort['order'])->get()->random(5), 'is_regional' => false, 'is_provincial' => false]);
    }

    public function indexProvincial()
    {
        $sort = Utils::getSortColumn(request('trierpar', ''));
        return view('index')->with(['places' => Place::where('is_approved', true)->orderBy($sort['col'], $sort['order'])->get(), 'is_regional' => false, 'is_provincial' => true]);
    }

    public function indexRegional(Region $region)
    {
        $sort = Utils::getSortColumn(request('trierpar', ''));
        return view('index')->with(['places' => $region->places()->where('is_approved', true)->orderBy($sort['col'], $sort['order'])->get(), 'selectedRegion' => $region, 'is_regional' => true,  'is_provincial' => false]);
    }

    public function indexRegionalCategories(Region $region, $category)
    {
        $category = Category::where('slug', $category)->first();
        $sort = Utils::getSortColumn(request('trierpar', ''));
        $places = $category->places()->where('is_approved', true)->where('places.region_id', $region->id)->orderBy($sort['col'], $sort['order'])->get();

        return view('index')->with(['places' => $places, 'selectedRegion' => $region, 'is_regional' => true, 'category' => $category,  'is_provincial' => false]);
    }
}
