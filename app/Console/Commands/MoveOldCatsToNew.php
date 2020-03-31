<?php

namespace App\Console\Commands;

use App\Category;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class MoveOldCatsToNew extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'soloc:transform-categories {old} {new}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Should never be used if you don\'t know what it does. Keep off, this could be destructive.';

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
            $places_to_change = Category::find($this->argument('old'))->each(function ($category) {
                
                $category->places()->each(function ($place) {
                    
                    $new_categories_map = collect(DB::table('category_place')
                                            ->select('category_id')
                                            ->where('place_id', $place->id)
                                            ->get())->transform(function ($item, $key) {
                                                return $item->category_id;
                                            })
                                            ->reject(function ($category) {
                                                return $category == (int) $this->argument('old');
                                            })
                                            ->push((int) $this->argument('new'))
                                            ->toArray();

                    $place->categories()->sync($new_categories_map);
                });
            });
        }
    }
}
