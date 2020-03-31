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

Route::middleware(['auth', 'can:access-backend'])->group(function () {
    Route::get('/home', 'HomeController@index')->name('home');

    Route::get('/user/{user}', 'UserController@edit')->name('users.edit');
    Route::put('/user/{user}', 'UserController@update')->name('users.update');

    Route::get('/distribution/ajout', 'DeliveryTypeController@create')->name('deliveryTypes.create');
    Route::post('/distribution', 'DeliveryTypeController@store')->name('deliveryTypes.store');

    Route::get('/moderation', 'ModerationController@index')->name('moderation.index');
    Route::get('/moderation/{region:slug}', 'ModerationController@show')->name('moderation.show');
    Route::get('/moderation/place/{place:slug}/approbation', 'ModerationController@store')->name('moderation.approve');
    Route::get('/moderation/places/{place:slug}/enlever', 'ModerationController@delete')->name('moderation.delete');
    Route::post('/moderation/places/{place:slug}/enlever', 'ModerationController@destroy')->name('moderation.destroy');
    Route::get('/moderation/places/{place:slug}/fermer', 'ModerationController@close')->name('moderation.close');
    Route::post('/moderation/places/{place:slug}/fermer', 'ModerationController@closing')->name('moderation.closing');

    Route::get('/places', 'PlaceController@index')->name('places.index');
    Route::get('/places/ajout', 'PlaceController@create')->name('places.create');
    Route::post('/places', 'PlaceController@store')->name('places.store');
    Route::get('/places/{place:slug}/modifier', 'PlaceController@edit')->name('places.edit');
    Route::put('/places/{place:slug}', 'PlaceController@update')->name('places.update');

    Route::get('/categorie/ajout', 'CategoryController@create')->name('categories.create');
    Route::post('/categorie', 'CategoryController@store')->name('categories.store');

    //Read
    Route::get('/categories', 'CategoryController@index')->name('categories'); // view all category

    //Update
    Route::get('/category/{category}/edit', 'CategoryController@edit')->name('category.edit');
    Route::put('/category/{category}', 'CategoryController@update')->name('category.update');

    //Delete
    Route::get('/category/{category}/delete', 'CategoryController@delete')->name('category.delete');
    Route::delete('/category/{category}', 'CategoryController@destroy')->name('category.destroy');

});

Auth::routes(['register' => false]);
Route::get('/categorie/{category:slug}', 'CategoryController@index')->name('categories.index');

Route::get('/region/{region:slug}', 'PublicController@indexRegional')->name('public.index-region');
Route::get('/region/province', 'PublicController@indexProvincial')->name('public.index-provincial');
Route::get('/region/{region:slug}', 'PublicController@indexRegional')->name('public.index-region');
Route::get('/region/{region:slug}/{category}', 'PublicController@indexRegionalCategories')->name('public.index-region-category');
Route::get('/recherche', 'PublicController@indexSearch')->name('public.index-search');
Route::get('/recherche/{region:slug}', 'PublicController@indexSearch')->name('public.index-search-region');
Route::get('/entreprise/ajout', 'PlaceController@createPublic')->name('places.create-public');
Route::post('/entreprise/ajout', 'PlaceController@storePublic')->name('places.store-public')->middleware(ProtectAgainstSpam::class);
Route::get('/entreprise/{place:slug}', 'PlaceController@show')->name('places.show');
Route::get('/entreprise/json/{place:slug}', 'PlaceController@showJson')->name('places.showjson');
Route::get('/carte', 'MapController@show')->name('map.show');
Route::get('/', 'PublicController@index')->name('public.index');
