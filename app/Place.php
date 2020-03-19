<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    protected $fillable = [
        'name', 'address', 'province', 'region', 'city', 'countryCode', 'postalCode', 'phoneNumber', 'additionnalPhoneNumber', 'email', 'url', 'long', 'lat', 'instructions', 'deliveryZone'
    ];

    protected $hidden = [
        'long', 'lat',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
}
