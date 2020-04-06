<?php

use App\Partner;
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
        Partner::create([
            'name' => 'UPA',
            'url' => 'https://www.upa.qc.ca/',
        ]);
    }
}
