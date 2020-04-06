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
        return view('approvals.index');
    }

    public function show(Region $region)
    {
        return view('approvals.show')->with(['queue' => $region->places()->where('is_approved', false)->get(), 'region' => $region]);
    }

    public function store(Place $place)
    {
        $place->is_approved = true;
        $place->save();

        return redirect()->route('approvals.show', ['region' => $place->region->slug])->with('status', 'Fiche approuvée!');
    }

    public function close(Place $place)
    {
        return view("moderation.close")->with(['place' => $place]);
    }

    public function closing(Place $place, Request $request)
    {
        $place->is_closed = $request->get('is_closed');
        $place->save();

        return redirect(route('places.index'))->with('status', "{$place->name} a été correctement modifié.");
    }

    // display the destroy page.
    public function delete(Place $place)
    {
        return view('places.delete')->with(['place' => $place]);
    }

    public function destroy(Place $place)
    {
        $place->delete();

        return redirect()->route('approvals.show', ['region' => $place->region->slug])->with('status', 'Fiche détruite!');
    }
}
