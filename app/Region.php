<?php

namespace App;

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
    public function searchPlacesByKeyword($q) {
        $like = '%'.str_replace(' ', '%', $q).'%';
        $search = 'is_approved and (name like ? or address like ? or city like ?)';
        $bindings = [$like, $like, $like];
        return $this->places()->whereRaw($search, $bindings)->orderBy('name')->get();
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
