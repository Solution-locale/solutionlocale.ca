<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    protected $fillable = [
        'url',
        'name',
    ];

    public function places()
    {
        return $this->hasMany(Place::class);
    }
}
