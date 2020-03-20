<?php

use App\Category;
use Illuminate\Database\Seeder;

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
