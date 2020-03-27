<?php

use Illuminate\Database\Seeder;

class LocalTestingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $category = App\Category::create(['name' => 'Produits d\'épicerie']);
        App\Category::create(['name' => 'Repas de restaurant']);
        App\Category::create(['name' => 'Médicaments et produits de pharmacie']);
        App\Category::create(['name' => 'Hygiène et produits naturels']);
        App\Category::create(['name' => 'Mets cuisinés']);

        App\PlaceType::create(['name' => "L'entreprise offre essentiellement des produits cultivés, fabriqués ou transformés au Québec"]);
        App\PlaceType::create(['name' => "L'entreprise est un commerce de proximité au sein d'une municipalité"]);

        App\DeliveryType::create(['name' => 'Cueillette sans contact']);
        $delivery = App\DeliveryType::create(['name' => 'Livraison à domicile sans contact']);
        App\DeliveryType::create(['name' => 'Livraison par la poste']);

        App\Region::create(['name' => 'Bas-Saint-Laurent']);
        App\Region::create(['name' => 'Saguenay–Lac-Saint-Jean']);
        App\Region::create(['name' => 'Capitale-Nationale']);
        $region = App\Region::create(['name' => 'Mauricie']);
        App\Region::create(['name' => 'Estrie']);
        App\Region::create(['name' => 'Montréal']);
        App\Region::create(['name' => 'Outaouais']);
        App\Region::create(['name' => 'Abitibi-Témiscamingue']);
        App\Region::create(['name' => 'Côte-Nord']);
        App\Region::create(['name' => 'Nord-du-Québec']);
        App\Region::create(['name' => 'Gaspésie–Îles-de-la-Madeleine']);
        App\Region::create(['name' => 'Chaudière-Appalaches']);
        App\Region::create(['name' => 'Laval']);
        App\Region::create(['name' => 'Lanaudière']);
        App\Region::create(['name' => 'Laurentides']);
        App\Region::create(['name' => 'Montérégie']);
        App\Region::create(['name' => 'Centre-du-Québec']);

        $place = App\Place::create(['name' => 'Miel Beaulieu', 'address' => '224 Rue de la Petite-Pointe', 'province' => 'Québec', 'subRegion' => 'Les Chenaux', 'city' => 'Sainte-Geneviève-de-Batiscan', 'countryCode' => 'ca', 'postalCode' => 'G0X 2R0', 'long' => '-72.3445000', 'lat' => '46.5318000', 'phoneNumber' => '819-489-0184', 'email' => 'mielbeaulieu@gmail.com', 'region_id' => $region->id]);
        $place->categories()->sync($category->id);
        $place->delivery()->sync($delivery->id);
        $place->types()->sync([1, 2]);

        App\User::create(['name' => 'Jean-Philippe Murray', 'email' => 'curieuxmurray@gmail.com', 'password' => Illuminate\Support\Facades\Hash::make('secret')]);
    }
}
