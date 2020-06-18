<?php

use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Solutionlocale\Commons\Models\Partner::create([
            'name' => 'UPA',
            'url' => 'https://www.upa.qc.ca/',
        ]);
    }
}
