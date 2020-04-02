<?php

namespace App\Console\Commands;

use App\Place;
use App\Services\GoogleGeocoding;
use Carbon\Carbon;
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
                            {--limit= : Limit processing to X number of places for testing.}
                            {--single_place= : Will run for only a single place that you specify ID of.}';

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
        if ($this->option('single_place') !== null) {
            $this->normalize(Place::find($this->option('single_place')));

            $this->info("Done!");
            exit;
        }

        if ($this->option('limit') !== null) {
            Place::whereNotNull('normalized_at')->orderByRaw('RAND()')->take($this->option('limit'))->get()->each(function ($place) {
                $this->normalize($place);
            });

            $this->info("Done!");
            exit;
        }

        Place::whereNotNull('normalized_at')->get()->each(function ($place) {
            $this->normalize($place);
        });

        $this->info("Done!");
    }

    private function normalize($place)
    {
        $this->line("Normalizing data for place ID({$place->id})");

        $google_geocoding = new GoogleGeocoding($place);
        $google_geocoding->init()->collectAllData();

        $place->plus_code = $google_geocoding->getPlusCode();
        $place->lat = $google_geocoding->getGeographyData()['lat'];
        $place->long = $google_geocoding->getGeographyData()['long'];
        $place->normalized_at = Carbon::now("America/Montreal");

        $place->save();
    }
}
