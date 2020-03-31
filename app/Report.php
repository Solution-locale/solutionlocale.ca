<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'name', 'reason', 'email', 'place_id'
    ];

    public function place()
    {
        return $this->belongsTo(Place::class);
    }
}
