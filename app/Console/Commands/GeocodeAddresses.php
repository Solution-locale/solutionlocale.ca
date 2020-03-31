<?php

namespace App\Console\Commands;

use App\Place;
use Geocodio;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class GeocodeAddresses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'soloc:geocode {place?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Loop through places to geocode address.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        if ($this->argument('place') === null) {
            $this->geocodeMultiple();
        } else {
            $this->geocodeSingle();
        }

        $this->line("");
        $this->line("Done!");
    }

    public function geocodeMultiple()
    {
        $i = 1;
        $total = Place::count();
        
        Place::all()->each(function ($place) use (&$i, $total) {
            
            $address = $place->complete_address.", Canada";
            $seconds = 86400; // 24 hours

            $response = Cache::remember($address, $seconds, function () use ($address) {
                return Geocodio::geocode($address)->results[0];
            });

            $place->long = $response->location->lng;
            $place->lat = $response->location->lat;
            $place->save();

            $this->info("{$i}/{$total}: Refreshed Geolocation for {$place->name} ({$place->id})");
            $i++;
        });
    }

    public function geocodeSingle()
    {
        $place = Place::find($this->argument('place'));

        $address = $place->complete_address.", Canada";
        $seconds = 86400; // 24 hours

        $response = Cache::remember($address, $seconds, function () use ($address) {
            return Geocodio::geocode($address)->results[0];
        });

        $place->long = $response->location->lng;
        $place->lat = $response->location->lat;
        $place->save();

        $this->info("Refreshed Geolocation for {$place->name} ({$place->id})");
    }
}
