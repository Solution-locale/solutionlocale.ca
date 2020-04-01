<?php
namespace App\Http\Controllers;

use App\Rcm;
use App\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class RcmController extends Controller
{
    public function listJson($region=null) {
        $rcms = [];
        if ($region) {
            $region = Region::where('id', $region)->get()->first();
            if (!$region) { return abort(404); }
            $rcms = Rcm::where('region_id', $region->id)->orderBy('name')->get();
        } else {
            $rcms = Rcm::orderBy('name')->get();
        }
        return response()->json($rcms);
    }
}
