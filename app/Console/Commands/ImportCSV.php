<?php

namespace App\Console\Commands;

use App\Imports\PlacesImport;
use Illuminate\Console\Command;
use Maatwebsite\Excel\Facades\Excel;

class ImportCSV extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:csv
                            {filename : CSV file to import from stotage}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import CSV: heavily opiniated, don\'t use unless you know what you do!';

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
        Excel::import(new PlacesImport, $this->argument('filename')); // /storage/app/{filename}
    }
}
