<?php

namespace App\Services;

use App\Place;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class GoogleGeocoding
{

    protected $place;

    private $should_cache = true;
    private $response = null;
    private $plus_code = null;
    private $address_data = null;
    private $geography_data = null;
    private $is_cached_result = false;

    /**
     * [__construct Initialize the class]
     * @param Place   $place A place to search for
     * @param boolean $cache Should be cache result, if not already cached
     */
    public function __construct(Place $place, $cache = true)
    {
        if (!config("services.google.places.api.key")) {
            throw new \Exception("You did not specify any required API key in your environment file.");
            exit;
        }

        $this->place = $place;
        $this->should_cache = $cache;

        return $this;
    }

    /**
     * Starts the data collection process
     * @param  boolean $cache If the response should be cached.
     * @return $this
     */
    public function init()
    {
        if ($this->should_cache) {
            $this->response = Cache::rememberForever("google_geocoding_for_place_id={$this->place->id}", function () {
                return $this->executeRequest();
            });

            $this->is_cached_result = true;
            return $this;
        }

        $this->response = $this->executeRequest();
        return $this;
    }

    /**
     * Send a request to Google's Geocoding API for a specific place
     * @return \Collection
     */
    private function executeRequest()
    {
        $response = \GoogleMaps::load('geocoding')
                    ->setParam([
                        'address' => $this->place->complete_address
                    ])
                    ->get();

        // sometimes, Google's not entirely sure and will send multiple, but first = best
        return collect(json_decode($response)->results)->first();
    }

    /**
     * Returns the collected Plus Code
     * @return string Plus code
     */
    public function getPlusCode()
    {
        return $this->plus_code;
    }

    /**
     * Return the street number found
     */
    public function getStreetNumber()
    {
        return isset($this->address_data['street_number']) ? $this->address_data['street_number'] : null;
    }

    /**
     * Return the street number found
     */
    public function getStreet()
    {
        return isset($this->address_data['route']) ? $this->address_data['route'] : null;
    }

    /**
     * Return the street number found
     */
    public function getCity()
    {
        return isset($this->address_data['locality']) ? $this->address_data['locality'] : null;
    }

    /**
     * Return the street number found
     */
    public function getProvince()
    {
        return isset($this->address_data['administrative_area_level_1']) ? $this->address_data['administrative_area_level_1'] : null;
    }

    /**
     * Return the street number found
     */
    public function getCountry()
    {
        return isset($this->address_data['country']) ? $this->address_data['country'] : null;
    }

    /**
     * Return the post code found
     * @return mixed returns NULL if the post code was invalid, or post code.
     */
    public function getPostalCode($validated = true)
    {
        if ($validated && isset($this->address_data['postal_code'])) {
            $length = Str::length($this->address_data['postal_code']);
            return $length <= 3 ? null : $this->address_data['postal_code'];
        }

        return isset($this->address_data['postal_code']) ? $this->address_data['postal_code'] : null;
    }

    /**
     * Returns the collected address data
     * @return array Array containing (might miss some data sometimes, on Google's whim) "street_number", "route" (street), "locality" (city), "administrative_area_level_1" (normally, province), "country" and "postal_code".
     */
    public function getAddressData()
    {
        return $this->address_data;
    }

    /**
     * Returns the collected geography data
     * @return array Array containing "lat" and "long" data
     */
    public function getGeographyData()
    {
        return $this->geography_data;
    }

    /**
     * Return the information on the source of the data coming from local cache or not
     * @return boolean
     */
    public function getIsCachedResult()
    {
        return $this->is_cached_result;
    }

    /**
     * Order the collection of all usefull data
     * @return $this
     */
    public function collectAllData()
    {
        $this->collectPlusCode();
        $this->collectGeographyData();
        $this->collectAddressData();

        return $this;
    }

    /**
     * Fetches the Plus Code for the result
     * Plus Codes are useful to link back to Google Maps, if we want that.
     * @return $this
     */
    public function collectPlusCode()
    {
        try {
            $this->plus_code = $this->response->plus_code->global_code;
        } catch (\Exception $e) {
            $this->plus_code = null;
        }

        return $this;
    }

    /**
     * Fetches known latitude and longitude for the result
     * @return $this
     */
    public function collectGeographyData()
    {
        try {
            $this->geography_data = [
                'lat' => $this->response->geometry->location->lat,
                'long' => $this->response->geometry->location->lng,
            ];
        } catch (\Exception $e) {
            $this->geography_data = null;
        }

        return $this;
    }

    /**
     * Fetches address data for the result
     * @return $this
     */
    public function collectAddressData()
    {
        try {
            $components = collect($this->response->address_components);

            $this->address_data = $components->filter(function ($element) {
                $types = collect($element->types);

                return $types->search('street_number') !== false ||
                        $types->search('route') !== false ||
                        $types->search('locality') !== false ||
                        $types->search('administrative_area_level_1') !== false || // province, normalement, short et long form
                        $types->search('country') !== false ||
                        $types->search('postal_code') !== false;
            })->mapWithKeys(function ($item) {
                return [$item->types[0] => $item->long_name];
            });
        } catch (\Exception $e) {
            $this->address_data = null;
        }
            
        return $this;
    }
}
