<?php

namespace App\Http\Controllers;

use App\Charts\DailyNewPlaces;
use Solutionlocale\Commons\Models\Place;

class ChartsController extends Controller
{
    public function dailyNewPlaces()
    {
        $data = Place::all()
            ->groupBy(function ($place) {
                return $place->created_at->toDateString();
            })
            ->map(function ($item) {
                return count($item);
            });

        $chart = new DailyNewPlaces;
        $chart->labels($data->keys());
        $chart->dataset('Nouvelles fiches par jour', 'line', $data->values());

        return view('admin.charts.daily-new-places', ['chart' => $chart]);
    }
}
