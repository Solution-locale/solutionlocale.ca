<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Solutionlocale\Commons\Models\Place;
use Solutionlocale\Commons\Provider\GoogleGeocoding;

class NormalizePlacesWithGoogle extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'soloc:normalize
                            {--G|plus_code : Will set the Google Plus Code for maps found on normalization.}
                            {--A|latitude :  Will set the latitude found on normalization.}
                            {--O|longitude : Will set the longitude found on normalization.}
                            {--C|city : Will set the city found on normalization.}
                            {--P|postal_code : Will set the postal code found on normalization.}
                            {--limit= : Limit processing to X number of places for testing.}
                            {--single_place= : Will run for only a single place that you specify ID of.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Tries to normalize data with the Google Place API. If no option is set, it will not change anything.';

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
            Place::whereNull('normalized_at')
                ->orderByRaw('RAND()')
                ->take($this->option('limit'))
                ->get()
                ->each(function ($place) {
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
        $changed = false;

        if ($this->option('plus_code')) {
            $place->plus_code = $google_geocoding->getPlusCode();
            $changed = true;
        }

        if ($this->option('latitude')) {
            $place->lat = $google_geocoding->getGeographyData()['lat'];
            $changed = true;
        }

        if ($this->option('longitude')) {
            $place->long = $google_geocoding->getGeographyData()['long'];
            $changed = true;
        }

        if ($this->option('city')) {
            $place->city = $google_geocoding->getCity();
            $changed = true;
        }

        if ($this->option('postal_code')) {
            $place->postalCode = $google_geocoding->getPostalCode();
            $changed = true;
        }

        if ($changed) {
            $place->normalized_at = Carbon::now();
            $place->save();
        }
    }
}
