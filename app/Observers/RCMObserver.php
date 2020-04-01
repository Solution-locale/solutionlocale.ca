<?php

namespace App\Observers;

use App\Rcm;
use Illuminate\Support\Str;

class RCMObserver
{
    public function created(Rcm $rcm)
    {
        $slug = Str::slug($rcm->name);
        $rcm->slug = $slug;
        $random = Str::random(5);
        $existing = Rcm::where('slug', $slug)->count();

        $rcm->slug = $existing == 0 ? $slug : "{$slug}-{$random}";
        $rcm->save();
    }

    public function updating(Rcm $rcm)
    {
        if ($rcm->isDirty('name')) {
            $slug = Str::slug($rcm->name);
            $random = Str::random(5);
            $existing = Rcm::where('slug', $slug)->count();
            $rcm->slug = $existing == 0 ? $slug : "{$slug}-{$random}";
        }
    }
}
