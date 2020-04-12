<?php

namespace App\Console\Commands;

use App\Mail\ModeratorHasPlacesToCheck;
use App\Region;
use App\User;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Mail;

class EmailModeratorsForQueue extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'soloc:moderator-queue-notification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Will check for places to moderate and send region moderators a notification.';

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
        $users = User::role('moderator')->get();

        $users->each(function ($user, $key) {
            if ($user->regions->isEmpty()) {
                $this->sendWithAllRegions($user);
            } else {
                $this->sendWithModeratorRegions($user);
            }
        });
    }

    private function sendEmail(User $user, $moderation_queue, $type)
    {
        if ($moderation_queue->isNotEmpty()) {
            Mail::mailer('mailjet')
                ->to($user)
                ->send(new ModeratorHasPlacesToCheck($moderation_queue));

            $this->line("Email sent to {$user->email} with {$type} regions.");
        }
    }

    private function sendWithAllRegions($user)
    {
        $moderation_queue = Region::withCount([
            'places as waiting_for_moderation' => function (Builder $query) {
                $query->where('is_approved', false);
            },
        ])->get()->reject(function ($region) {
            return $region->waiting_for_moderation == 0;
        });

        $this->sendEmail($user, $moderation_queue, 'all');
    }

    private function sendWithModeratorRegions($user)
    {
        $moderation_queue = $user->regions()->withCount([
            'places as waiting_for_moderation' => function (Builder $query) {
                $query->where('is_approved', false);
            },
        ])->get()->reject(function ($region) {
            return $region->waiting_for_moderation == 0;
        });
        
        $this->sendEmail($user, $moderation_queue, 'specific');
    }
}
