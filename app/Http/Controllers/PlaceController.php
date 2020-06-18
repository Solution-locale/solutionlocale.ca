<?php

namespace App\Http\Controllers;

use Geocodio;
use App\Place;
use App\Region;
use App\Category;
use Illuminate\Http\Request;
use App\Http\Requests\StorePlaces;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Cache;
use Solutionlocale\Commons\Filters\PlaceFilter;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param \Solutionlocale\Commons\Filters\PlaceFilter
     * @return \Illuminate\Http\Response
     */
    public function index(PlaceFilter $request)
    {
        $places = Place::filter($request)->whereNull('rejection_id')->get();
        $regions = Region::all()->pluck('name', 'id');

        return view('places.index', compact('places', 'regions'));
    }

    public function indexClosed()
    {
        $places = Place::where('is_closed', true)->whereNull('rejection_id')->get();

        return view('places.closed', compact('places'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('places.create');
    }

    public function createPublic()
    {
        $categories = Category::where('parent_id', '=', null)->get();

        return view("add", compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePlaces $request)
    {
        $place = Place::create([
            'name' => $request->name,
            'address' => $request->address['line1'],
            'province' => "Québec",
            'region_id' => $request->region_id,
            'subRegion' => null,
            'city' => $request->city,
            'countryCode' => "ca",
            'postalCode' => $request->postalCode,
            'phoneNumber' => $request->phoneNumber,
            'additionnalPhoneNumber' => $request->additionnalPhoneNumber,
            'email' => $request->email,
            'url' => $request->url,
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
            'address' => $request->address['line1'],
            'province' => "Québec",
            'region_id' => $request->region_id,
            'subRegion' => null,
            'city' => $request->city,
            'countryCode' => "ca",
            'postalCode' => $request->postalCode,
            'phoneNumber' => $request->phoneNumber,
            'additionnalPhoneNumber' => $request->additionnalPhoneNumber,
            'email' => $request->email,
            'url' => $request->url,
            'facebook_url' => $request->facebook_url,
            'instructions' => $request->instructions,
            'deliveryZone' => $request->deliveryZone,
            'hide_address' => $request->boolean('hideAddress'),
            'rcm_id' => $request->rcm_id,
        ]);

        $place->categories()->sync($request->categories);
        $place->delivery()->sync($request->deliveryType);
        $place->types()->sync($request->placeType);

        $address = "{$place->complete_address}, Canada";

        $response = Cache::remember($address, 86400, function () use ($address) {
            return Geocodio::geocode($address)->results[0];
        });

        $place->long = $response->location->lng;
        $place->lat = $response->location->lat;
        $place->save();

        return redirect()->route('places.create-public')->with('status', 'Bien reçu! Si cette fiche est acceptée par les modérateurs, elle sera affichée sous peu!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function show(Place $place)
    {
        if (!$place->is_approved && Gate::denies('do-moderation')) {
            abort(403);
        }

        if ($place->rejection_id !== null && Gate::denies('do-moderation')) {
            abort(403);
        }

        if (Gate::denies('do-moderation')) {
            $place->increment('views');
        }

        return view('places.show')->with(['place' => $place]);
    }

    /**
     * Display the specified resource as JSON
     *
     * @param  \App\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function showJson(Place $place)
    {
        if (!$place->is_approved && Gate::denies('do-moderation')) {
            abort(403);
        }

        if (Gate::denies('do-moderation')) {
            $place->increment('views');
        }

        if ($place->hide_address) {
            unset($place->address);
        }

        $place->categories = $place->categories->toArray();
        $place->delivery = $place->delivery->toArray();

        return $place;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function edit(Place $place)
    {

        return view('places.edit')->with([
            'place' => $place,
            'categories' => Category::where('parent_id', '=', null)->get(),
        ]);
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
        $coordinate_changed = ($request->lat != $place->lat || $request->long != $place->long);
        $address_changed = ($request->address['line1'] != $place->address ||
            $request->city != $place->city ||
            $request->postalCode != $place->postalCode);

        $place->name = $request->name;
        $place->address = $request->address['line1'];
        $place->address_2 = empty($request->address['line2']) ? null : $request->address['line2'];
        $place->city = $request->city;
        $place->postalCode = $request->postalCode;
        $place->region_id = $request->region_id;
        $place->rcm_id = $request->rcm_id;
        $place->phoneNumber = $request->phoneNumber;
        $place->additionnalPhoneNumber = $request->additionnalPhoneNumber;
        $place->email = $request->email;
        $place->url = $request->url;
        $place->facebook_url = $request->facebook_url;
        $place->hide_address = $request->boolean('hideAddress');
        $place->deliveryZone = $request->deliveryZone;
        $place->save();

        $place->categories()->sync($request->categories);
        $place->delivery()->sync($request->deliveryType);
        $place->types()->sync($request->placeType);

        if ($coordinate_changed && auth()->user()->can("super_admin")) {
            $place->lat = $request->lat;
            $place->long = $request->long;
            $place->save();
        } elseif ($address_changed && !$coordinate_changed) { // verified because we want to save as much API call as we can
            $address = "{$place->complete_address}, Canada";

            $response = Cache::remember($address, 86400, function () use ($address) {
                return Geocodio::geocode($address)->results[0];
            });

            $place->long = $response->location->lng;
            $place->lat = $response->location->lat;
            $place->save();
        }

        return redirect('home')->with('status', 'Place modifiée!');
    }
}
