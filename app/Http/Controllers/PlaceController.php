<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Requests\StorePlaces;
use App\Place;
use App\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        if (Gate::denies('do-moderation')) {
            abort(401);
        }

        return view('places.create');
    }

    public function createPublic()
    {
        return view('add');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePlaces $request)
    {
        if (Gate::denies('do-moderation')) {
            abort(401);
        }

        $place = Place::create([
            'name' => $request->name,
            'address' => $request->addressjson['name'],
            'province' => ! isset($request->addressjson['administrative']) ? 'Québec' : $request->addressjson['administrative'],
            'region_id' => $request->region_id,
            'subRegion' => ! isset($request->addressjson['county']) ? $request->addressjson['city'] : $request->addressjson['county'],
            'city' => $request->addressjson['city'],
            'countryCode' => ! isset($request->addressjson['countryCode']) ? 'ca' : $request->addressjson['countryCode'],
            'postalCode' => ! isset($request->addressjson['postalCode']) ? null : $request->addressjson['postalCode'],
            'phoneNumber' => $request->phoneNumber,
            'additionnalPhoneNumber' => $request->additionnalPhoneNumber,
            'email' => $request->email,
            'url' => $request->url,
            'long' => ! isset($request->addressjson['latlng']['lng']) ? null : $request->addressjson['latlng']['lng'],
            'lat' => ! isset($request->addressjson['latlng']['lat']) ? null : $request->addressjson['latlng']['lat'],
            'instructions' => $request->instructions,
            'deliveryZone' => $request->deliveryZone,
            'hide_address' => $request->boolean('hideAddress'),
        ]);

        $place->categories()->sync($request->categories);
        $place->delivery()->sync($request->deliveryType);
        $place->types()->sync($request->placeType);

        return redirect('home')->with('status', 'Place ajoutée!');
    }

    public function storePublic(StorePlaces $request)
    {
        $place = Place::create([
            'name' => $request->name,
            'address' => $request->addressjson['name'],
            'province' => ! isset($request->addressjson['administrative']) ? 'Québec' : $request->addressjson['administrative'],
            'region_id' => $request->region_id,
            'subRegion' => ! isset($request->addressjson['county']) ? $request->addressjson['city'] : $request->addressjson['county'],
            'city' => $request->addressjson['city'],
            'countryCode' => ! isset($request->addressjson['countryCode']) ? 'ca' : $request->addressjson['countryCode'],
            'postalCode' => ! isset($request->addressjson['postcode']) ? null : $request->addressjson['postcode'],
            'phoneNumber' => $request->phoneNumber,
            'additionnalPhoneNumber' => $request->additionnalPhoneNumber,
            'email' => $request->email,
            'url' => $request->url,
            'long' => ! isset($request->addressjson['latlng']['lng']) ? null : $request->addressjson['latlng']['lng'],
            'lat' => ! isset($request->addressjson['latlng']['lat']) ? null : $request->addressjson['latlng']['lat'],
            'instructions' => $request->instructions,
            'deliveryZone' => $request->deliveryZone,
            'hide_address' => $request->boolean('hideAddress'),
        ]);

        $place->categories()->sync($request->categories);
        $place->delivery()->sync($request->deliveryType);
        $place->types()->sync($request->placeType);

        return redirect('/entreprise/ajout')->with('status', 'Bien reçu! Si cette fiche est acceptée par les modérateurs, elle sera affichée sous peu!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function show(Place $place)
    {
        if (! $place->is_approved && Gate::denies('do-moderation')) {
            abort(403);
        }

        if (Gate::denies('do-moderation')) {
            $place->increment('views');
        }

        return view('places.show')->with(['place' => $place]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function edit(Place $place)
    {
        if (Gate::denies('do-moderation')) {
            abort(401);
        }

        return view('places.edit')->with(['place' => $place]);
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
        if (Gate::denies('do-moderation')) {
            abort(401);
        }

        $place->name = $request->name;
        $place->region_id = $request->region_id;
        $place->phoneNumber = $request->phoneNumber;
        $place->additionnalPhoneNumber = $request->additionnalPhoneNumber;
        $place->email = $request->email;
        $place->url = $request->url;
        $place->hide_address = $request->boolean('hideAddress');
        $place->deliveryZone = $request->deliveryZone;
        $place->save();

        $place->categories()->sync($request->categories);
        $place->delivery()->sync($request->deliveryType);
        $place->types()->sync($request->placeType);

        return redirect('home')->with('status', 'Place modifiée!');
    }
}
