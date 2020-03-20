<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    protected $fillable = [
        'name', 'address', 'province', 'region', 'subRegion', 'city', 'countryCode', 'postalCode', 'phoneNumber', 'additionnalPhoneNumber', 'email', 'url', 'long', 'lat', 'instructions', 'deliveryZone'
    ];

    protected $hidden = [
        'long', 'lat',
    ];

    public function region()
    {
        return $this->belongsTo(Region::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function types()
    {
        return $this->belongsToMany(PlaceType::class);
    }

    public function delivery()
    {
        return $this->belongsToMany(DeliveryType::class);
    }
}
