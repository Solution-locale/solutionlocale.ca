<?php

namespace App\Console\Commands;

use App\Imports\PlacesUPAImport;
use Illuminate\Console\Command;
use Maatwebsite\Excel\Facades\Excel;

class ImportUPAData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:upa
                            {filename : CSV file to import from stotage}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import a CSV file from the template of the UPA.';

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
        Excel::import(new PlacesUPAImport, $this->argument('filename')); // /storage/app/{filename}
    }
}
