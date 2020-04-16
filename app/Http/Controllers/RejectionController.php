<?php

namespace App\Http\Controllers;

use App\Place;
use App\Rejection;
use Illuminate\Http\Request;

class RejectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('rejections.index')->with([
            'places' => Place::whereNotNull('rejection_id')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Place $place)
    {
        return view('approvals.reject')->with([
            'place' => $place,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Place $place)
    {
        $rejection = new Rejection([
            'user_id' => $request->user()->id,
            'place_id' => $place->id,
            'reason' => $request->reason,
        ]);
        $rejection->save();

        $place->is_approved = false;
        $place->rejection_id = $rejection->id;
        $place->save();

        return redirect()->route('approvals.show', ['region' => $place->region->slug])->with('status', 'Fiche rejetée!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Rejection  $rejection
     * @return \Illuminate\Http\Response
     */
    public function show(Rejection $rejection)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Rejection  $rejection
     * @return \Illuminate\Http\Response
     */
    public function edit(Rejection $rejection)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Rejection  $rejection
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rejection $rejection)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Rejection  $rejection
     * @return \Illuminate\Http\Response
     */
    public function destroy(Place $place)
    {
        $place->rejection->delete();
        $place->rejection_id = null;
        $place->save();

        return redirect()->back();
    }
}
