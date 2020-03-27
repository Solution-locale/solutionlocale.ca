<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Place;
use App\Region;
use Faker\Generator as Faker;

$factory->define(Place::class, function (Faker $faker) {
    return [
        'name'  =>  $faker->name,
        'slug'  =>  $faker->slug,
        'address'   =>  $faker->address,
        'province'  =>  $faker->city,
        'region_id' =>  factory(Region::class),
        'subRegion' =>  $faker->city,
        'city'  =>  $faker->city,
        'countryCode'   =>  $faker->countryCode,
        'postalCode'    =>  $faker->postcode,
        'long'  =>  $faker->longitude,
        'lat'   =>  $faker->latitude,
        'phoneNumber'   =>  $faker->phoneNumber,
        'additionnalPhoneNumber'    =>  $faker->phoneNumber,
        'email' =>  $faker->email,
        'url'   =>  $faker->url,
        'deliveryZone'  =>  $faker->text,
        'is_approved'   =>  $faker->boolean,
    ];
});
