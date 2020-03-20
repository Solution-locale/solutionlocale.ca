<?php

namespace App\Observers;

use App\Region;
use Illuminate\Support\Str;

class RegionObserver
{
    public function created(Region $region)
    {
        $region->slug = Str::slug($region->name);
        $region->save();
    }
}
