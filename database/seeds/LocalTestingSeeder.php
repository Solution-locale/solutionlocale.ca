<?php

use Illuminate\Database\Seeder;
use Solutionlocale\Commons\Models\Place;
use Solutionlocale\Commons\Models\Region;
use Solutionlocale\Commons\Models\Category;
use Solutionlocale\Commons\Models\PlaceType;
use Solutionlocale\Commons\Models\DeliveryType;

class LocalTestingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $category = Category::create(['name' => 'Produits d\'épicerie']);
        Category::create(['name' => 'Repas de restaurant']);
        Category::create(['name' => 'Médicaments et produits de pharmacie']);
        Category::create(['name' => 'Hygiène et produits naturels']);
        Category::create(['name' => 'Mets cuisinés']);

        PlaceType::create(['name' => "L'entreprise offre essentiellement des produits cultivés, fabriqués ou transformés au Québec"]);
        PlaceType::create(['name' => "L'entreprise est un commerce de proximité au sein d'une municipalité"]);

        DeliveryType::create(['name' => 'Cueillette sans contact']);
        $delivery = DeliveryType::create(['name' => 'Livraison à domicile sans contact']);
        DeliveryType::create(['name' => 'Livraison par la poste']);

        Region::create(['name' => 'Bas-Saint-Laurent']);
        Region::create(['name' => 'Saguenay–Lac-Saint-Jean']);
        Region::create(['name' => 'Capitale-Nationale']);
        $region = Region::create(['name' => 'Mauricie']);
        Region::create(['name' => 'Estrie']);
        Region::create(['name' => 'Montréal']);
        Region::create(['name' => 'Outaouais']);
        Region::create(['name' => 'Abitibi-Témiscamingue']);
        Region::create(['name' => 'Côte-Nord']);
        Region::create(['name' => 'Nord-du-Québec']);
        Region::create(['name' => 'Gaspésie–Îles-de-la-Madeleine']);
        Region::create(['name' => 'Chaudière-Appalaches']);
        Region::create(['name' => 'Laval']);
        Region::create(['name' => 'Lanaudière']);
        Region::create(['name' => 'Laurentides']);
        Region::create(['name' => 'Montérégie']);
        Region::create(['name' => 'Centre-du-Québec']);

        $place = Place::create(['name' => 'Miel Beaulieu', 'address' => '224 Rue de la Petite-Pointe', 'province' => 'Québec', 'subRegion' => 'Les Chenaux', 'city' => 'Sainte-Geneviève-de-Batiscan', 'countryCode' => 'ca', 'postalCode' => 'G0X 2R0', 'long' => '-72.3445000', 'lat' => '46.5318000', 'phoneNumber' => '819-489-0184', 'email' => 'mielbeaulieu@gmail.com', 'region_id' => $region->id]);
        $place->categories()->sync($category->id);
        $place->delivery()->sync($delivery->id);
        $place->types()->sync([1, 2]);

        \Solutionlocale\Commons\Models\User::create(['name' => 'Jean-Philippe Murray', 'email' => 'curieuxmurray@gmail.com', 'password' => Illuminate\Support\Facades\Hash::make('secret')]);
    }
}
