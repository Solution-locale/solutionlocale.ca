<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class MapController extends Controller
{
    /**
     * Display the map
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $places = DB::table('places')
            ->select('slug', 'long', 'lat')
            ->where('is_closed', false)
            ->where('is_approved', true)
            ->whereNull('rejection_id')
            ->whereNotNull('long')
            ->whereNotNull('lat')
            ->get();

        return view('map.map')->with(['places' => $places]);
    }
}
