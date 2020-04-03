<?php

namespace App\Imports;

use App\Place;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PlacesUPAImport implements ToCollection, WithHeadingRow
{
    protected $category_correspondence = [
        'subcategory_1' => 39, // id prod for "boisson"
        'subcategory_2' => 40, // id prod for "grains et céréales"
        'subcategory_3' => 41, // id prod for "fromages et laitages"
        'subcategory_4' => 42, // id prod for "fruits et légumes"
        'subcategory_5' => 43, // id prod for "miel"
        'subcategory_6' => 44, // id prod for "produits de l'érable"
        'subcategory_7' => 45, // id prod for "produits biologiques"
        'subcategory_8' => 46, // id prod for "produits horitcoles"
        'subcategory_9' => 47, // id prod for "viandes et poisson"
    ];
    
    /**
    * @param Collection $collection
    */
    public function collection(Collection $rows)
    {
        $this->testcat = collect();
        foreach ($rows as $key => $row) {
            if ($key != 0) { // heading row
                $categories = collect([]);
                for ($i=1; $i <= 9; $i++) {  // 9 == total of subcategory_X fields
                    $index_name = "subcategory_{$i}";
                    $row[$index_name] !== null ? $categories->push($this->category_correspondence[$index_name]) : null;
                }

                $place = new Place();

                $place->partner_id = 1;
                $place->name = $row['name'];
                $place->region_id = $row['region_id'];
                $place->url = $row['url'];
                $place->facebook_url = $row['facebook_url'];
                $place->email = $row['email'];
                $place->address = $row['address'];
                $place->city = $row['city'];
                $place->province = "Québec";
                $place->countryCode = "ca";
                $place->postalCode = $row['postalcode'];
                // $place->rmc_id = "";
                // $place->lat = "";
                // $place->long = "";
                $place->phoneNumber = $row['phonenumber'];
                $place->additionnalPhoneNumber = $row['additionnalphonenumber'];
                $place->deliveryZone = $row['deliveryzone'];
                $place->is_approved = true;

                $this->testcat->push($this->formatDeliveryType($row['deliverytype_id']));

                // dd($categories, $place);
            }
        }
        dd($this->testcat->flatten()->unique());
    }

    private function formatDeliveryType($value)
    {
        return Str::of($value)->trim()->explode(PHP_EOL);
        // dd($value);
    }
}
