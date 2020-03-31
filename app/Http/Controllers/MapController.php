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
        $places = DB::table('places')->select('slug', 'long', 'lat')->where('is_approved', true)->whereNotNull('long')->whereNotNull('lat')->get();

        return view('map.map')->with(['places' => $places]);
    }
}
