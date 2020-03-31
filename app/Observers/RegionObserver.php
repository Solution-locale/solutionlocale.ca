<?php

namespace App\Observers;

use App\Region;
use Illuminate\Support\Str;

class RegionObserver
{
    public function created(Region $region)
    {
        $slug = Str::slug($region->name);
        $region->slug = $slug;
        $random = Str::random(5);
        $existing = Region::where('slug', $slug)->count();

        $region->slug = $existing == 0 ? $slug : "{$slug}-{$random}";
        $region->save();
    }

    public function updating(Region $region)
    {
        if ($region->isDirty('name')) {
            $slug = Str::slug($region->name);
            $random = Str::random(5);
            $existing = Region::where('slug', $slug)->count();
            $region->slug = $existing == 0 ? $slug : "{$slug}-{$random}";
        }
    }
}
