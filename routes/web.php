<?php

use App\User;
use Illuminate\Support\Facades\Auth;
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

Route::get('/out', function () {
    Auth::logout();
});

Auth::routes(['register' => false]);

Route::middleware(['auth'])->get('/accueil', 'CommercantController@index')->name('accueil');

// so regular user can update their password, it' out of the bigger group with other users options
Route::middleware(['auth'])->prefix('/users')->name('users.')->group(function () {
    //Update self
    Route::get('/me', 'UserController@editSelf')->name('edit-self');
    Route::put('/me', 'UserController@updateSelf')->name('update-self');
});

Route::middleware(['auth', 'limite.commercant'])->group(function () {
    Route::get('/home', 'HomeController@index')->name('home');
    Route::get('/admin/charts/daily-new-places', 'ChartsController@dailyNewPlaces')->name('charts.daily-new-places');

    Route::get('/activity-logs', 'ActivityLogController@index')->name('activity-log.index');
    Route::get('/activity-logs/by-user/{user}', 'ActivityLogController@showUserActivity')->name('activity-log.by-user');

    //User
    Route::prefix('/users')->name('users.')->group(function () {
        Route::get('/', 'UserController@index')->name('index')->middleware('can:do-admin');

        //Create
        Route::get('/ajout', 'UserController@create')->name('create')->middleware('can:do-admin');
        Route::post('/', 'UserController@store')->name('store')->middleware('can:do-admin');

        Route::get('/{user}', 'UserController@edit')->name('edit')->middleware('can:do-admin');
        Route::put('/{user}', 'UserController@update')->name('update')->middleware('can:do-admin');
    });
});

//Distribution
Route::prefix('/distribution')->name('deliveryTypes.')->middleware(['auth', 'can:do-admin', 'limite.commercant'])->group(function () {
    //Create
    Route::get('/ajout', 'DeliveryTypeController@create')->name('create');
    Route::post('/', 'DeliveryTypeController@store')->name('store');
});

//Moderation
Route::middleware(['limite.commercant'])->prefix('/approbations')->name('approvals.')->group(function () {
    //Read
    Route::get('/', 'ModerationController@index')->name('index');
    Route::get('/rejet/', 'RejectionController@index')->name('index-reject');
    Route::get('/rejet/{place:slug}', 'RejectionController@create')->name('create-reject');
    Route::get('/rejet/{place:slug}/annuler', 'RejectionController@destroy')->name('cancel-rejection');

    Route::post('/rejet/{place:slug}', 'RejectionController@store')->name('rejected');
    Route::get('/regions/{region:slug}', 'ModerationController@show')->name('show');

    //Create
    Route::get('/{place:slug}', 'ModerationController@store')->name('create');
});

//Places
Route::prefix('/places')->name('places.')->group(function () {
    //outside of below group to accomodate update from businesses
    Route::put('/{place:slug}', 'PlaceController@update')->name('update')->middleware(['auth']);

    Route::middleware(['auth', 'can:do-moderation', 'limite.commercant'])->group(function () {
        Route::get('/fermées', 'PlaceController@indexClosed')->name('closed');

        //Create
        Route::get('/ajout', 'PlaceController@create')->name('create');
        Route::post('/', 'PlaceController@store')->name('store');

        //Update
        Route::get('/{place:slug}/modifier', 'PlaceController@edit')->name('edit');

        //Delete
        Route::get('/{place:slug}/enlever', 'ModerationController@delete')->name('delete');
        Route::delete('/{place:slug}', 'ModerationController@destroy')->name('destroy');


        // Open / close places
        Route::get('/{place:slug}/ouverture', 'ModerationController@close')->name('close');
        Route::post('/{place:slug}/ouverture', 'ModerationController@closing')->name('closing');
    });

    //Create public
    Route::get('/ajout', 'PlaceController@createPublic')->name('create-public');
    Route::post('/', 'PlaceController@storePublic')->name('store-public');

    // Easter egg
    Route::get('/fee-des-dents', 'PublicController@feeDents')->name('fee-des-dents');

    //Read public
    Route::get('/{place:slug}', 'PlaceController@show')->name('show');
    Route::get('/json/{place:slug}', 'PlaceController@showJson')->name('json.show');
});

//Categories
Route::prefix('/categories')->name('categories.')->group(function () {
    //Read
    Route::get('/', 'CategoryController@index')->name('index'); // view all categories

    Route::middleware(['auth', 'can:do-moderation', 'limite.commercant'])->group(function () {
        //Create
        Route::get('/ajout', 'CategoryController@create')->name('create');
        Route::post('/', 'CategoryController@store')->name('store');

        //Update
        Route::get('/{category}/edit', 'CategoryController@edit')->name('edit');
        Route::put('/{category}', 'CategoryController@update')->name('update');

        //Delete
        Route::get('/{category}/delete', 'CategoryController@delete')->name('delete');
        Route::delete('/{category}', 'CategoryController@destroy')->name('destroy');
    });
});

Route::prefix('/regions')->name('regions.')->group(function () {
    //Read
    Route::get('/province', 'PublicController@indexProvincial')->name('index-provincial');
    Route::get('/{region:slug}', 'PublicController@indexRegional')->name('index-region');
    Route::get('/{region:slug}/{category}', 'PublicController@indexRegionalCategories')->name('index-region-category');
});

Route::prefix('/recherche')->name('recherche.')->group(function () {
    //Read
    Route::get('/', 'PublicController@indexSearch')->name('index');
    Route::get('/{region:slug}', 'PublicController@indexSearch')->name('index-region');
});

Route::prefix('/carte')->name('map.')->group(function () {
    Route::get('/', 'MapController@show')->name('show');
});

Route::get('/mrc/json', 'RcmController@listJson')->name('rcm.list-json');
Route::get('/mrc/json/{region}', 'RcmController@listJson')->name('rcm.list-json-region');

Route::get('/equipe-et-partenaires', 'PublicController@teamPage')->name('public.team');
Route::get('/à-propos', 'PublicController@aboutPage')->name('public.about');
Route::get('/', 'PublicController@index')->name('public.index');
