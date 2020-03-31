<?php

namespace App\Http\Controllers;

use App\Place;
use App\Region;
use App\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ModerationController extends Controller
{
    public function index()
    {
        if (Gate::denies('do-moderation')) {
            abort(401);
        }

        return view('moderation.index');
    }

    public function show(Region $region)
    {
        if (Gate::denies('do-moderation')) {
            abort(401);
        }

        return view('moderation.show')->with(['queue' => $region->places()->where('is_approved', false)->get(), 'region' => $region]);
    }

    public function showReports()
    {
        if (Gate::denies('do-moderation')) {
            abort(401);
        }

        return view('moderation.showReports')->with(['reports' => Report::where('archived', false)->get()]);
    }

    public function store(Place $place)
    {
        if (Gate::denies('do-moderation')) {
            abort(401);
        }

        $place->is_approved = true;
        $place->save();

        return redirect()->route('moderation.show', ['region' => $place->region->slug])->with('status', 'Fiche approuvée!');
    }

    public function archiveReport(Report $report)
    {
        if (Gate::denies('do-moderation')) {
            abort(401);
        }

        $report->archived = true;
        $report->save();

        return redirect()->route('moderation.showReports')->with('status', 'Signalement archivé!');
    }

    // display the destroy page.
    public function delete(Place $place)
    {
        if (Gate::denies('do-moderation')) {
            abort(401);
        }

        return view('moderation.delete')->with(['place' => $place]);
    }

    public function destroy(Place $place)
    {
        if (Gate::denies('do-moderation')) {
            abort(401);
        }

        $place->delete();

        return redirect()->route('moderation.show', ['region' => $place->region->slug])->with('status', 'Fiche détruite!');
    }
}
