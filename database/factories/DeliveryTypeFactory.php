<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\DeliveryType;
use Faker\Generator as Faker;

$factory->define(DeliveryType::class, function (Faker $faker) {
    return [
        'name'  =>  $faker->words(3, true),
    ];
});
