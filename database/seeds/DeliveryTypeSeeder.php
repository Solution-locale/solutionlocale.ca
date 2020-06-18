<?php

use Illuminate\Database\Seeder;
use Solutionlocale\Commons\Models\DeliveryType;

class DeliveryTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DeliveryType::create(['name' => 'Collecte sans contact sur place']);
        DeliveryType::create(['name' => 'Livraison à domicile sans contact']);
        DeliveryType::create(['name' => 'Livraison par la poste']);
        DeliveryType::create(['name' => 'Service offert en ligne uniquement']);
    }
}
