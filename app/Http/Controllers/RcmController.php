<?php

namespace App\Http\Controllers;

use Solutionlocale\Commons\Models\Rcm;
use Solutionlocale\Commons\Models\Region;

class RcmController extends Controller
{
    public function listJson($region = null)
    {
        $rcms = [];
        if ($region) {
            $region = Region::where('id', $region)->get()->first();
            if (!$region) {
                return abort(404);
            }
            $rcms = Rcm::where('region_id', $region->id)->orderBy('name')->get();
        } else {
            $rcms = Rcm::orderBy('name')->get();
        }
        return response()->json($rcms);
    }
}
