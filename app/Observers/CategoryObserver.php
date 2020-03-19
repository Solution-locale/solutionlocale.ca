<?php

namespace App\Observers;

use App\Category;
use Illuminate\Support\Str;

class CategoryObserver
{
    public function created(Category $category)
    {
        $category->slug = Str::slug($category->name);
        $category->save();
    }
}
