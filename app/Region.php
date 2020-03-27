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
     * Method returning the page title of the object
     * @return string
     */
    public function getPageTitle(): string 
    {
        return $this->name . ' - Région - ' . config('app.name', '');
    }
}
