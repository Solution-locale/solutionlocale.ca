<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use Solutionlocale\Commons\Models\Region;

$factory->define(Region::class, function (Faker $faker) {
    return [
        'name'  =>  $faker->name,
        'slug'  =>  $faker->slug,
    ];
});
