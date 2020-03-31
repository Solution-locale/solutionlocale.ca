<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'parent_id'
    ];

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id','id');
    }

    public function parent()
    {
        return $this->hasOne(Category::class, 'id','parent_id');
    }

    public function places()
    {
        return $this->belongsToMany(Place::class);
    }

    /**
     * Method returning the page title of the object.
     * @return string
     */
    public function getPageTitle(): string
    {
        return $this->name.' - '.config('app.name', '');
    }
    public function is_parent_category($id) { return $this->parent_id === $id; }
}
