<?php

namespace App;

use App\Place;
use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    protected $fillable = [
        'name',
    ];

    public function places()
    {
        return $this->hasMany(Place::class);
    }

    /**
     * Method returning the page title of the object.
     * @return string
     */
    public function getPageTitle(): string 
    {
        return $this->name.' - '.config('app.name', '');
    }

    /**
     * Method for searching places belonging to the region that match keywords.
     * @param string $q
     * @return Illuminate\Database\Eloquent\Collection
     */
    public function searchPlacesByKeyword($q, $sortBy=null, $sortOrder=null) {
        $regionId = $this->id;
        $places = Place::searchByKeyword($q, $sortBy, $sortOrder)->filter(function($place) use($regionId) {
            return $place->region_id === $regionId;
        });
        return $places;
    }

    /**
     * Method for counting places belonging to the region that match keywords.
     * @param string $q
     * @return int
     */
    public function countPlacesByKeyword($q) {
        $places = $this->searchPlacesByKeyword($q);
        return count($places);
    }
}
