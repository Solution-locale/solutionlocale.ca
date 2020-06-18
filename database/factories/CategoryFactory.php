<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;

$factory->define(\Solutionlocale\Commons\Models\Category::class, function (Faker $faker) {
    return [
        'name'  =>  $faker->name,
        'slug'  =>  $faker->slug,
    ];
});
