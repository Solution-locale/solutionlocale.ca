<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Requests\StoreCategories;
use Illuminate\Support\Facades\Gate;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $categories = Category::where('active','=',1)->get();

        return view('categories.index')->with(['categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $categories = Category::where('active','=',1)->get();
        return view("categories.create", compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreCategories $request
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(StoreCategories $request)
    {
        $category = new Category(request([
                'name',
                'parent_id'
            ])
        );

        $category->save();

        return redirect('home')->with('status', 'Catégorie ajoutée!');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Category  $category
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit(Category $category)
    {
        $categories = Category::where('active','=',1)->get();
        return view('categories.edit', compact('category', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Category                      $category
     *
     * @param \App\Http\Requests\StoreCategories $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update (Category $category, StoreCategories $request)
    {

        $category->name = $request['name'];
        $category->parent_id = $request['parent_id'];

        $category->save();

        return redirect()
            ->route('home')
            ->with('status', request("name") . ' à été modifier avec succès');
    }

    public function delete (Category $category)
    {
        return view('categories.delete', compact('category'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Category $category)
    {
        $category->active = 0;
        $category->save();

        return redirect()
            ->route('categories.index')
            ->with('saved.message', __('app.confirmation.update',[
                'title'  =>  request("name")
            ]));
    }
}
