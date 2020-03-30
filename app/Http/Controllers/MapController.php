<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use App\Place;

class MapController extends Controller
{
    /**
     * Display the map
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        //5 minutes caching
        $places = Cache::remember('places-for-map', 60 * 5, function () {
            return DB::table('places')->select('slug', 'long', 'lat')->where('is_approved', true)->get();
        });

        return view('map.map')->with(['places' => $places]);
    }
}
