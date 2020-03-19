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
        App\Category::create(['name' => 'Produits d\'épicerie']);
        App\Category::create(['name' => 'Repas de restaurant']);
        App\Category::create(['name' => 'Médicaments et produits de pharmacie']);
        App\Category::create(['name' => 'Hygiène et produits naturels']);

        App\User::create(['name' => "Jean-Philippe Murray", "email" => "curieuxmurray@gmail.com", "password" => Illuminate\Support\Facades\Hash::make('secret')]);
    }
}
