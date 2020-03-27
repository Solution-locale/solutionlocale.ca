<?php

namespace App\Imports;

use App\Place;
use App\Region;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PlacesImport implements ToCollection, WithHeadingRow
{
    private $client;
    public $nbsErreur;

    public function __construct()
    {
        $this->nbsErreur = 1;
        $this->client = \Algolia\AlgoliaSearch\PlacesClient::create(config('services.algolia_places.app_id'), config('services.algolia_places.key'));
    }

    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            $placeType = is_string($row['placetype']) ? explode(',', $row['placetype']) : [$row['placetype']];
            $region = Region::where('name', $row['region_administrative'])->first();

            $result = $this->client->search("{$row['coordonnees_adresse']}");

            if ($result['nbHits'] == 0) {
                $search = false;
                echo "{$this->nbsErreur} Aucun résultat: {$row['nom_de_lentreprise']} ({$row['coordonnees_adresse']} {$row['code_postal']})\r\n";
                $this->nbsErreur++;
            } else {
                $search = $result['hits'][0];
            }

            try {
                if ($search) {
                    $place = Place::create([
                        'name' => $row['nom_de_lentreprise'],
                        'address' => $search['locale_names']['default'][0],
                        'province' => 'Québec',
                        'region_id' => $region->id,
                        'subRegion' => ! isset($search['county']) ? $search['city']['default'][0] : $search['county']['default'][0],
                        'city' => $search['city']['default'][0],
                        'countryCode' => $search['country_code'],
                        'postalCode' => ! isset($search['postcode']) ? $row['code_postal'] : $search['postcode'][0],
                        'phoneNumber' => $row['numero_de_telephone'],
                        'email' => $row['courriel'],
                        'url' => $row['site_web'],
                        'long' => $search['_geoloc']['lng'],
                        'lat' => $search['_geoloc']['lat'],
                        'deliveryZone' => $row['secteur_desservi_pour_la_livraison'],
                    ]);

                    $place->types()->sync($placeType);
                }
            } catch (\Exception $e) {
                echo "{$this->nbsErreur} Erreur: {$row['nom_de_lentreprise']} \r\n";
                $this->nbsErreur++;
            }
        }
    }
}
