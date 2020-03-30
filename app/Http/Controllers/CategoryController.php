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
        if (Gate::denies('do-admin')) {
            abort(401);
        }

        $category = Category::all()->where('active','=',1);

        return view('byCategory')->with(['places' => $category->places]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        if (Gate::denies('do-admin')) {
            abort(401);
        }

        return view('categories.create');
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
        if (Gate::denies('do-admin')) {
            abort(401);
        }

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
        return view('categories.edit', compact('category'));
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
    public function update(Category $category, StoreCategories $request)
    {
        $category->update(request([
            'name',
            'parent_id'
        ]));

        return redirect()
            ->route('categories')
            ->with('saved.message', __('app.confirmation.update',[
                'title'  =>  request("name")
            ]));
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
        $category->update(['active' => 0]);

        return redirect()
            ->route('categories')
            ->with('saved.message', __('app.confirmation.update',[
                'title'  =>  request("name")
            ]));
    }
}
