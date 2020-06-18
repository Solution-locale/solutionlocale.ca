<?php

use Illuminate\Database\Seeder;
use Solutionlocale\Commons\Models\Region;

class RegionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Region::create(['name' => 'Bas-Saint-Laurent']);
        Region::create(['name' => 'Saguenay–Lac-Saint-Jean']);
        Region::create(['name' => 'Capitale-Nationale']);
        Region::create(['name' => 'Mauricie']);
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
    }
}
