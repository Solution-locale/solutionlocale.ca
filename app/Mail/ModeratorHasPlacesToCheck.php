<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ModeratorHasPlacesToCheck extends Mailable
{
    use Queueable, SerializesModels;

    public $moderation_queue;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($moderation_queue)
    {
        $this->moderation_queue = $moderation_queue;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
                ->from('aucune-reponses@solutionlocale.ca', 'solutionlocale.ca')
                ->subject('Fiches en attente de modération sur Solution locale')
                ->markdown('mails.moderatorhasplacestocheck');
    }
}
