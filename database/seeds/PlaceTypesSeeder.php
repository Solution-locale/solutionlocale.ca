<?php

use App\PlaceType;
use Illuminate\Database\Seeder;

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
    }
}
