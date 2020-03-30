<?php

namespace App\Observers;

use App\Place;
use Illuminate\Support\Str;

class PlaceObserver
{
    public function created(Place $place)
    {
        $slug = Str::slug($place->name);
        $random = Str::random(5);
        $existing = Place::where('slug', $slug)->count();

        $place->slug = $existing == 0 ? $slug : "{$slug}-{$random}";
        $place->save();
    }

    public function updating(Place $place)
    {
        if ($place->isDirty('name')) {
            $slug = Str::slug($place->name);
            $random = Str::random(5);
            $existing = Place::where('slug', $slug)->count();
            $place->slug = $existing == 0 ? $slug : "{$slug}-{$random}";
        }
    }
}
