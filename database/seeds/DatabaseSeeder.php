<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        App\Category::create(['name' => 'Nourriture']);
        App\Category::create(['name' => 'Papier de  toilette']);
        App\Category::create(['name' => 'Animaux']);
        App\Category::create(['name' => 'Alcool']);
        App\Category::create(['name' => 'Chips']);
        App\Category::create(['name' => 'Essence']);

        App\User::create(['name' => "Jean-Philippe Murray", "email" => "curieuxmurray@gmail.com", "password" => Illuminate\Support\Facades\Hash::make('secret')]);
    }
}
