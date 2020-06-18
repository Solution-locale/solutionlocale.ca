<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;

$factory->define(\Solutionlocale\Commons\Models\DeliveryType::class, function (Faker $faker) {
    return [
        'name'  =>  $faker->words(3, true),
    ];
});
