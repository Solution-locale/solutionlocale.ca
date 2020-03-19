<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
 
Auth::routes();

Route::middleware(['auth', 'can:do-admin'])->group(function () {
    Route::get('/home', 'HomeController@index')->name('home');

    Route::get('/places/ajout', 'PlaceController@create')->name('places.create');
    Route::post('/places', 'PlaceController@store')->name('places.store');

    Route::get('/categorie/ajout', 'CategoryController@create')->name('categories.create');
    Route::post('/categorie', 'CategoryController@store')->name('categories.store');
});
