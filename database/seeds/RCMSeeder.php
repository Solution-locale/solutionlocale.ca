<?php

use App\Rcm;
use App\Region;
use Illuminate\Database\Seeder;

class RCMSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Rcm::create(['region_id' => 1, 'name' => 'La Matapédia']);
        Rcm::create(['region_id' => 1, 'name' => 'La Matanie']);
        Rcm::create(['region_id' => 1, 'name' => 'La Mitis']);
        Rcm::create(['region_id' => 1, 'name' => 'Rimouski-Neigette']);
        Rcm::create(['region_id' => 1, 'name' => 'Des Basques']);
        Rcm::create(['region_id' => 1, 'name' => 'Rivière-du-Loup']);
        Rcm::create(['region_id' => 1, 'name' => 'Témiscouata']);
        Rcm::create(['region_id' => 1, 'name' => 'Kamouraska']);
        Rcm::create(['region_id' => 2, 'name' => 'Domaine-du-Roy']);
        Rcm::create(['region_id' => 2, 'name' => 'Maria-Chapdeleine']);
        Rcm::create(['region_id' => 2, 'name' => 'Lac Saint-Jean-Est']);
        Rcm::create(['region_id' => 2, 'name' => 'Ville de Saguenay']);
        Rcm::create(['region_id' => 2, 'name' => 'Fjord-du-Saguenay']);
        Rcm::create(['region_id' => 3, 'name' => 'Charlevoix-Est']);
        Rcm::create(['region_id' => 3, 'name' => 'Charlevoix']);
        Rcm::create(['region_id' => 3, 'name' => "L'Île-d'Orléans"]);
        Rcm::create(['region_id' => 3, 'name' => 'La Côte-de-Beaupré']);
        Rcm::create(['region_id' => 3, 'name' => 'La Jacques-Cartier']);
        Rcm::create(['region_id' => 3, 'name' => 'Notre-dame-des-Anges']);
        Rcm::create(['region_id' => 3, 'name' => 'Québec']);
        Rcm::create(['region_id' => 3, 'name' => 'Portneuf']);
        Rcm::create(['region_id' => 4, 'name' => "Mékinac"]);
        Rcm::create(['region_id' => 4, 'name' => "Shawinigan"]);
        Rcm::create(['region_id' => 4, 'name' => "Trois-Rivières"]);
        Rcm::create(['region_id' => 4, 'name' => "Des Chenaux"]);
        Rcm::create(['region_id' => 4, 'name' => "Maskinongé"]);
        Rcm::create(['region_id' => 4, 'name' => "La Tuque"]);
        Rcm::create(['region_id' => 5, 'name' => "Granit"]);
        Rcm::create(['region_id' => 5, 'name' => "Sources"]);
        Rcm::create(['region_id' => 5, 'name' => "Haut-Saint-François"]);
        Rcm::create(['region_id' => 5, 'name' => "Val-Saint-François"]);
        Rcm::create(['region_id' => 5, 'name' => "Sherbrooke"]);
        Rcm::create(['region_id' => 5, 'name' => "Coaticook"]);
        Rcm::create(['region_id' => 5, 'name' => "Memphrémagog"]);
        Rcm::create(['region_id' => 6, 'name' => "Montréal"]);
        Rcm::create(['region_id' => 7, 'name' => "Papineau"]);
        Rcm::create(['region_id' => 7, 'name' => "Gatineau"]);
        Rcm::create(['region_id' => 7, 'name' => "Collines-de-l'Outaouais"]);
        Rcm::create(['region_id' => 7, 'name' => "La Vallée-de-la-Gatineau"]);
        Rcm::create(['region_id' => 7, 'name' => "Pontiac"]);
        Rcm::create(['region_id' => 8, 'name' => "Témiscamingue"]);
        Rcm::create(['region_id' => 8, 'name' => "Rouyn-Noranda"]);
        Rcm::create(['region_id' => 8, 'name' => "Abitibi-Ouest"]);
        Rcm::create(['region_id' => 8, 'name' => "Abitibi"]);
        Rcm::create(['region_id' => 8, 'name' => "La Vallée-de-l'Or"]);
        Rcm::create(['region_id' => 9, 'name' => "La Haute-Côte-Nord"]);
        Rcm::create(['region_id' => 9, 'name' => "Manicouagan"]);
        Rcm::create(['region_id' => 9, 'name' => "Sept-Rivières"]);
        Rcm::create(['region_id' => 9, 'name' => "Caniapiscau"]);
        Rcm::create(['region_id' => 9, 'name' => "Minganie"]);
        Rcm::create(['region_id' => 9, 'name' => "Golf-du-Saint-Laurent"]);
        Rcm::create(['region_id' => 10, 'name' => "Nord-du-Québec"]);
        Rcm::create(['region_id' => 11, 'name' => "îles-de-la-Madeleine"]);
        Rcm::create(['region_id' => 11, 'name' => "Rocher-Percer"]);
        Rcm::create(['region_id' => 11, 'name' => "La Côte-de-Gaspé"]);
        Rcm::create(['region_id' => 11, 'name' => "La Haute-Gaspésie"]);
        Rcm::create(['region_id' => 11, 'name' => "Bonaventure"]);
        Rcm::create(['region_id' => 11, 'name' => "Avignon"]);
        Rcm::create(['region_id' => 12, 'name' => "L'Islet"]);
        Rcm::create(['region_id' => 12, 'name' => "Montmagny"]);
        Rcm::create(['region_id' => 12, 'name' => "Bellechasse"]);
        Rcm::create(['region_id' => 12, 'name' => "Lévis"]);
        Rcm::create(['region_id' => 12, 'name' => "La Nouvelle-Beauce"]);
        Rcm::create(['region_id' => 12, 'name' => "Robert-Cliche"]);
        Rcm::create(['region_id' => 12, 'name' => "Etchemins"]);
        Rcm::create(['region_id' => 12, 'name' => "Beauce-Sartigan"]);
        Rcm::create(['region_id' => 12, 'name' => "Appalaches"]);
        Rcm::create(['region_id' => 12, 'name' => "Lotbinière"]);
        Rcm::create(['region_id' => 13, 'name' => "Laval"]);
        Rcm::create(['region_id' => 14, 'name' => "D'Autray"]);
        Rcm::create(['region_id' => 14, 'name' => "L'Assomption"]);
        Rcm::create(['region_id' => 14, 'name' => "Joliette"]);
        Rcm::create(['region_id' => 14, 'name' => "Matawinie"]);
        Rcm::create(['region_id' => 14, 'name' => "Montcalm"]);
        Rcm::create(['region_id' => 14, 'name' => "Moulins"]);
        Rcm::create(['region_id' => 15, 'name' => "Deux-Montagnes"]);
        Rcm::create(['region_id' => 15, 'name' => "Thérèse-De Blainville"]);
        Rcm::create(['region_id' => 15, 'name' => "Mirabel"]);
        Rcm::create(['region_id' => 15, 'name' => "La Rivière-du-Nord"]);
        Rcm::create(['region_id' => 15, 'name' => "Argenteuil"]);
        Rcm::create(['region_id' => 15, 'name' => "Pays-d'en-Haut"]);
        Rcm::create(['region_id' => 15, 'name' => "Laurentides"]);
        Rcm::create(['region_id' => 15, 'name' => "Antoine-Labelle"]);
        Rcm::create(['region_id' => 16, 'name' => "Brome-Missisquoi"]);
        Rcm::create(['region_id' => 16, 'name' => "La Haute-Yamaska"]);
        Rcm::create(['region_id' => 16, 'name' => "Acton"]);
        Rcm::create(['region_id' => 16, 'name' => "Pierre-De Saurel"]);
        Rcm::create(['region_id' => 16, 'name' => "Maskoutains"]);
        Rcm::create(['region_id' => 16, 'name' => "Rouville"]);
        Rcm::create(['region_id' => 16, 'name' => "Haut-Richelieu"]);
        Rcm::create(['region_id' => 16, 'name' => "La Vallée-du-Richelieu"]);
        Rcm::create(['region_id' => 16, 'name' => "Longueuil"]);
        Rcm::create(['region_id' => 16, 'name' => "Marguerite-D'Youville"]);
        Rcm::create(['region_id' => 16, 'name' => "Roussillon"]);
        Rcm::create(['region_id' => 17, 'name' => "L'Érable"]);
        Rcm::create(['region_id' => 17, 'name' => "Bécancour"]);
        Rcm::create(['region_id' => 17, 'name' => "Arthabaska"]);
        Rcm::create(['region_id' => 17, 'name' => "Drummond"]);
        Rcm::create(['region_id' => 17, 'name' => "Nicolet-Yamaska"]);
    }
}
