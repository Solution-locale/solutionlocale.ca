<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class CommercantController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        return view('places.edit-commercant')->with([
            'place' => $request->user()->place,
            'categories' => Category::where('parent_id', '=', null)->get(),
        ]);
    }
}
