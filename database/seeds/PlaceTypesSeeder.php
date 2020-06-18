<?php

use Illuminate\Database\Seeder;
use Solutionlocale\Commons\Models\PlaceType;

class PlaceTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PlaceType::create(['name' => "L'entreprise offre essentiellement des produits cultivés, fabriqués ou transformés au Québec"]);
        PlaceType::create(['name' => "L'entreprise est un commerce de proximité au sein d'une municipalité"]);
        PlaceType::create(['name' => "L'entreprise est une bannière ou une franchise"]);
    }
}
