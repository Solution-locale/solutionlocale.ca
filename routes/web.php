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

Route::middleware(['auth', 'can:do-admin'])->group(function () {
    Route::get('/home', 'HomeController@index')->name('home');

    Route::get('/distribution/ajout', 'DeliveryTypeController@create')->name('deliveryTypes.create');
    Route::post('/distribution', 'DeliveryTypeController@store')->name('deliveryTypes.store');

    Route::get('/places/ajout', 'PlaceController@create')->name('places.create');
    Route::post('/places', 'PlaceController@store')->name('places.store');
    Route::get('/places/{place:slug}/modifier', 'PlaceController@edit')->name('places.edit');
    Route::put('/places/{place:slug}', 'PlaceController@update')->name('places.update');

    Route::get('/categorie/ajout', 'CategoryController@create')->name('categories.create');
    Route::post('/categorie', 'CategoryController@store')->name('categories.store');
});
 
Auth::routes();
Route::get('/categorie/{category:slug}', 'CategoryController@index')->name('categories.index');

Route::get('/region/{region:slug}', 'PublicController@index_regional')->name('public.index-region');
Route::get('/', 'PublicController@index')->name('public.index');
