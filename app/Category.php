<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
    ];

    public function places()
    {
        return $this->belongsToMany(Place::class);
    }


    /**
     * Method returning the page title of the object
     * @return string
     */
    public function getPageTitle(): string
    {
        return $this->name . ' - Catégorie - ' . config('app.name', '');
    }
}
