<?php

namespace App\Http\Controllers;

use App\Category;
use App\Place;
use App\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view("places.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $addressData = json_decode($request->addressData);
        
        $place = Place::create([
            'name' => $request->name,
            'address' => $addressData->name,
            'province' => $addressData->administrative,
            'region' => $request->region,
            'subRegion' => $addressData->county,
            'city' => $addressData->city,
            'countryCode' => $addressData->countryCode,
            'postalCode' => $addressData->postcode,
            'phoneNumber' => $request->phoneNumber,
            'additionnalPhoneNumber' => $request->additionnalPhoneNumber,
            'email' => $request->email,
            'url' => $request->url,
            'long' => $addressData->latlng->lng,
            'lat' => $addressData->latlng->lat,
            'instructions' => $request->instructions,
            'deliveryZone' => $request->deliveryZone
        ]);

        $place->categories()->sync($request->categories);
        $place->delivery()->sync($request->deliveryType);
        $place->type()->sync($request->placeType);

        return redirect('home')->with('status', 'Place ajoutée!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function show(Place $place)
    {
        if (!$place->is_approved && Gate::denies('do-admin')) {
            abort(403);
        }
        
        return view("places.show")->with(['place' => $place]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function edit(Place $place)
    {
        return view("places.edit")->with(['place' => $place]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Place $place)
    {

        $place->name = $request->name;
        $place->region_id = $request->region_id;
        $place->phoneNumber = $request->phoneNumber;
        $place->additionnalPhoneNumber = $request->additionnalPhoneNumber;
        $place->email = $request->email;
        $place->url = $request->url;
        $place->deliveryZone = $request->deliveryZone;
        $place->save();

        $place->categories()->sync($request->categories);
        $place->delivery()->sync($request->deliveryType);
        $place->types()->sync($request->placeType);

        return redirect('home')->with('status', 'Place modifiée!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function destroy(Place $place)
    {
        //
    }

    public function moderation()
    {
        if (Gate::denies('do-admin')) {
            abort(401);
        }

        $moderationQueue = Place::where('is_approved', false)->get()->groupBy("region.name");
        
        return view("places.moderation")->with('queue', $moderationQueue);
    }

    public function approve(Place $place)
    {
        if (Gate::denies('do-admin')) {
            abort(401);
        }

        $place->is_approved = true;
        $place->save();

        return back();
    }
}
