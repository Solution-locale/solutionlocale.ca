<?php

namespace App\Console\Commands;

use App\Place;
use App\Services\GoogleAPI;
use GoogleMaps\GoogleMaps;
use Google_Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class NormalizePlacesWithGoogle extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'soloc:normalize
                            {--limit= : Limit processing to X number of places for testing.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'try to normalize data with the Google Place API';

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

        if (!config("services.google.places.api.key")) {
            $this->error("You did not specify any required API key in your environment file.");
            exit;
        }

        if ($this->option('limit') === null) {
            $normalize = Place::all();
        } else {
            $normalize = Place::orderByRaw('RAND()')->take($this->option('limit'))->get();
        }

        $normalize->each(function ($place) {
            $this->line("Normalizing data for place ID({$place->id})");

            $google_geocoding_response = Cache::rememberForever("google_geocoding_for_q={$place->complete_address}", function () use ($place) {
                $response = \GoogleMaps::load('geocoding')
                        ->setParam([
                            'address' => $place->complete_address
                        ])
                        ->get();

                return json_decode($response);
            });

            dd($google_geocoding_response);
        });

        dd($response);
    }
}
