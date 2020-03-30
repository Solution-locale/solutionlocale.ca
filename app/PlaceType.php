<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlaceType extends Model
{
    protected $fillable = [
        'name',
    ];

    public function places()
    {
        return $this->belongsToMany(Place::class);
    }
}
