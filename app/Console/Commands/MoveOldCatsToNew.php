<?php

namespace App\Console\Commands;

use App\Region;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Solutionlocale\Commons\Models\Category;

class MoveOldCatsToNew extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'soloc:transform-categories
                            {old_cat_id : Old category ID to change}
                            {new_cat_id : New category ID to change the old to}
                            {region_id? : If you want to run a single region, rather than all the table, set region ID (optional)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Should never be used if you don\'t know what it does. Keep off, this could be destructive.';

    private $old_category;
    private $new_category;
    private $region;

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
        if ($this->confirm('This is a potentially destructive command. Are you sure you want to continue?')) {
            $this->old_category = Category::find($this->argument('old_cat_id'));
            $this->new_category = Category::find($this->argument('new_cat_id'));
            $this->region = Region::find($this->argument('region_id'));

            if ($this->region === null) {
                $this->loopThroughAllRegionCategories();
            } else {
                $this->loopThroughSpecificRegionCategories();
            }
        }
    }

    private function loopThroughSpecificRegionCategories()
    {

        $places_to_change = $this->old_category->places()->where('region_id', $this->region->id)->get();
        $count_places_to_change = $places_to_change->count();

        $this->info("Changement des catégories « {$this->old_category->name} » de la région {$this->region->name} en « $this->new_category->name ». Total de {$count_places_to_change} changements à effectuer.");

        $i = 1;
        $places_to_change->each(function ($place) use (&$i, $count_places_to_change) {
            $this->line("{$i}/{$count_places_to_change} Changement de catégories pour {$place->name}, au {$this->region->name}.");

            $new_categories_map = collect(DB::table('category_place')
                ->where('place_id', $place->id)
                ->select('category_id')
                ->get())->transform(function ($item, $key) {
                return $item->category_id;
            })
                ->reject(function ($category) {
                    return $category == $this->old_category->id;
                })
                ->push($this->new_category->id)
                ->toArray();

            $place->categories()->sync($new_categories_map);

            $i++;
        });
    }

    private function loopThroughAllRegionCategories()
    {
        $places_to_change = $this->old_category->places()->get();
        $count_places_to_change = $places_to_change->count();

        $this->info("Changement des catégories « {$this->old_category->name} » de toutes les région en « $this->new_category->name ». Total de {$count_places_to_change} changements à effectuer.");

        $i = 1;
        $places_to_change->each(function ($place) use (&$i, $count_places_to_change) {
            $this->line("{$i}/{$count_places_to_change} Changement de catégories pour {$place->name}, au {$place->region->name}.");

            $new_categories_map = collect(DB::table('category_place')
                ->where('place_id', $place->id)
                ->select('category_id')
                ->get())->transform(function ($item, $key) {
                return $item->category_id;
            })
                ->reject(function ($category) {
                    return $category == $this->old_category->id;
                })
                ->push($this->new_category->id)
                ->toArray();

            $place->categories()->sync($new_categories_map);

            $i++;
        });
    }
}
