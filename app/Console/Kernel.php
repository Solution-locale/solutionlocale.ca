<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('soloc:moderator-queue-notification')
        //     ->weekly()
        //     ->mondays()
        //     ->thursdays()
        //     ->at('8:00');

        $schedule->command('activitylog:clean --days=30')
            ->daily();

        $schedule->command('telescope:prune --hours=72')
            ->daily();

        // $schedule->command('backup:clean')
        //     ->environments('production')
        //     ->daily()
        //     ->at('01:00');

        // $schedule->command('backup:run')
        //     ->environments('production')
        //     ->daily()
        //     ->at('02:00');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }

    /**
     * Get the timezone that should be used by default for scheduled events.
     *
     * @return \DateTimeZone|string|null
     */
    protected function scheduleTimezone()
    {
        return 'America/Montreal';
    }
}
