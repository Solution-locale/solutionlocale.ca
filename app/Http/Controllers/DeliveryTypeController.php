<?php

namespace App\Http\Controllers;

use App\DeliveryType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class DeliveryTypeController extends Controller
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
        if (Gate::denies('do-admin')) {
            abort(401);
        }

        return view('deliveryTypes.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (Gate::denies('do-admin')) {
            abort(401);
        }

        $category = DeliveryType::create([
            'name' => $request->name,
        ]);

        return redirect('home')->with('status', 'Mode de distribution ajouté!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\DeliveryType  $deliveryType
     * @return \Illuminate\Http\Response
     */
    public function show(DeliveryType $deliveryType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\DeliveryType  $deliveryType
     * @return \Illuminate\Http\Response
     */
    public function edit(DeliveryType $deliveryType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DeliveryType  $deliveryType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DeliveryType $deliveryType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DeliveryType  $deliveryType
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeliveryType $deliveryType)
    {
        //
    }
}
