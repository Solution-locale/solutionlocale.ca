<?php

namespace App\Observers;

use App\Place;
use Illuminate\Support\Str;

class PlaceObserver
{
    public function created(Place $place)
    {
        $place->slug = Str::slug($place->name);
        $place->save();
    }
}
