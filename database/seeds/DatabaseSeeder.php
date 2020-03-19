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
        App\Category::create(['name' => 'Mets cuisinés']);

        App\Place::create(['name' => "Miel Beaulieu", 'address' => '224 Rue de la Petite-Pointe', 'province' => 'Québec', 'region' => 'Les Chenaux', 'city' => 'Sainte-Geneviève-de-Batiscan', 'countryCode' => 'ca', 'postalCode' => 'G0X 2R0', 'long' => '-72.3445000', 'lat' => '46.5318000', 'phoneNumber' => "819-489-0184", "email" => "mielbeaulieu@gmail.com", 'instructions' => "Livraison sans contact (MRC des Chenaux et Trois-Rivières)"]);

        App\User::create(['name' => "Jean-Philippe Murray", "email" => "curieuxmurray@gmail.com", "password" => Illuminate\Support\Facades\Hash::make('secret')]);
    }
}
