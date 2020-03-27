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
        if (Gate::denies('do-admin')) {
            abort(401);
        }

        return view("moderation.index");
    }

    public function show(Region $region)
    {
        if (Gate::denies('do-admin')) {
            abort(401);
        }

        return view("moderation.show")->with(['queue' => $region->places()->where('is_approved', false)->get(), 'region' => $region]);
    }

    public function store(Place $place)
    {
        if (Gate::denies('do-admin')) {
            abort(401);
        }

        $place->is_approved = true;
        $place->save();

        return redirect()->route('moderation.show', ['region' => $place->region->slug])->with('status', 'Fiche approuvée!');
    }

    public function close(Place $place)
    {
        if (Gate::denies('do-admin')) {
            abort(401);
        }

        return view("moderation.close")->with(['place' => $place]);
    }

    public function closing(Place $place, Request $request)
    {
        if (Gate::denies('do-admin')) {
            abort(401);
        }

        $place->is_closed = $request->get('is_closed');
        $place->save();

        return redirect(route('places.index'))->with('status', "{$place->name} a été correctement modifié.");
    }

    // display the destroy page.
    public function delete(Place $place)
    {
        if (Gate::denies('do-admin')) {
            abort(401);
        }

        return view("moderation.delete")->with(['place' => $place]);
    }

    public function destroy(Place $place)
    {
        if (Gate::denies('do-admin')) {
            abort(401);
        }

        $place->delete();

        return redirect()->route('moderation.show', ['region' => $place->region->slug])->with('status', 'Fiche détruite!');
    }
}
