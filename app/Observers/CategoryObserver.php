<?php

namespace App\Observers;

use App\Category;
use Illuminate\Support\Str;

class CategoryObserver
{
    public function created(Category $category)
    {
        $category->slug = Str::slug($category->name);
        $random = Str::random(5);
        $existing = Category::where('slug', $slug)->count();

        $category->slug = $existing == 0 ? $slug : "{$slug}-{$random}";
        $category->save();
    }

    public function updating(Category $category)
    {
        if ($category->isDirty('name')) {
            $slug = Str::slug($category->name);
            $random = Str::random(5);
            $existing = Category::where('slug', $slug)->count();
            $category->slug = $existing == 0 ? $slug : "{$slug}-{$random}";
        }
    }
}
