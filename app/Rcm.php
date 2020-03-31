<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rcm extends Model
{
    protected $fillable = [
        'region_id',
        'name',
    ];

    /**
     * Method returning the page title of the object.
     * @return string
     */
    public function getPageTitle(): string 
    {
        return $this->name.' - '.config('app.name', '');
    }

}
