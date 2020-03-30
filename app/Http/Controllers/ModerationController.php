<?php

namespace App\Http\Controllers;

use App\Place;
use App\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ModerationController extends Controller
{
    public function index()
    {
        return view('moderation.index');
    }

    public function show(Region $region)
    {
        return view('moderation.show')->with(['queue' => $region->places()->where('is_approved', false)->get(), 'region' => $region]);
    }

    public function store(Place $place)
    {
        $place->is_approved = true;
        $place->save();

        return redirect()->route('moderation.show', ['region' => $place->region->slug])->with('status', 'Fiche approuvée!');
    }

    // display the destroy page.
    public function delete(Place $place)
    {
        return view('moderation.delete')->with(['place' => $place]);
    }

    public function destroy(Place $place)
    {
        $place->delete();

        return redirect()->route('moderation.show', ['region' => $place->region->slug])->with('status', 'Fiche détruite!');
    }
}
