<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    protected $fillable = [
        'name', 'address', 'province', 'region_id', 'subRegion', 'city', 'countryCode', 'postalCode', 'phoneNumber', 'additionnalPhoneNumber', 'email', 'url', 'long', 'lat', 'deliveryZone', 'hide_address',
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

    public function getCompleteAddressAttribute()
    {
        return "{$this->address}, {$this->city}, {$this->province}, {$this->postalCode}";
    }
}
