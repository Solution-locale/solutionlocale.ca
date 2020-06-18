<?php

use Illuminate\Database\Seeder;
use Solutionlocale\Commons\Models\Category;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create(['name' => 'Produits d\'épicerie']);
        Category::create(['name' => 'Repas de restaurant']);
        Category::create(['name' => 'Médicaments et produits de pharmacie']);
        Category::create(['name' => 'Hygiène et produits naturels']);
        Category::create(['name' => 'Mets cuisinés']);
    }
}
