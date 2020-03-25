<?php

use Illuminate\Support\Facades\Route;
use Spatie\Honeypot\ProtectAgainstSpam;

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

    Route::get("/user/{user}", 'UserController@edit')->name('users.edit');
    Route::put("/user/{user}", 'UserController@update')->name('users.update');

    Route::get('/distribution/ajout', 'DeliveryTypeController@create')->name('deliveryTypes.create');
    Route::post('/distribution', 'DeliveryTypeController@store')->name('deliveryTypes.store');

    Route::get('/places/moderation', 'PlaceController@moderation')->name('places.moderation');
    Route::get('/places/ajout', 'PlaceController@create')->name('places.create');
    Route::post('/places', 'PlaceController@store')->name('places.store');
    Route::get('/places/{place:slug}/modifier', 'PlaceController@edit')->name('places.edit');
    Route::get('/places/{place:slug}/approbation', 'PlaceController@approve')->name('places.approve');
    Route::get('/places/{place:slug}/enlever', 'PlaceController@delete')->name('places.delete');
    Route::post('/places/{place:slug}/enlever', 'PlaceController@destroy')->name('places.destroy');
    Route::put('/places/{place:slug}', 'PlaceController@update')->name('places.update');

    Route::get('/categorie/ajout', 'CategoryController@create')->name('categories.create');
    Route::post('/categorie', 'CategoryController@store')->name('categories.store');
});
 
Auth::routes(['register' => false]);
Route::get('/categorie/{category:slug}', 'CategoryController@index')->name('categories.index');

Route::get('/region/{region:slug}', 'PublicController@indexRegional')->name('public.index-region');
Route::get('/region/{region:slug}/{category}', 'PublicController@indexRegionalCategories')->name('public.index-region-category');
Route::get('/entreprise/ajout', 'PlaceController@createPublic')->name('places.create-public');
Route::post('/entreprise/ajout', 'PlaceController@storePublic')->name('places.store-public')->middleware(ProtectAgainstSpam::class);
Route::get('/entreprise/{place:slug}', 'PlaceController@show')->name('places.show');
Route::get('/', 'PublicController@index')->name('public.index');
