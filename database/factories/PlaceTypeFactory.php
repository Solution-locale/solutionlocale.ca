<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use Solutionlocale\Commons\Models\PlaceType;

$factory->define(PlaceType::class, function (Faker $faker) {
    return [
        'name'  =>  $faker->words(7, true),
    ];
});
