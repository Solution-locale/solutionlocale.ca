<?php

namespace App\Notifications;

use App\Report;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\SlackMessage;

class PlaceReportReceived extends Notification
{
    use Queueable;

    protected $report;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Report $report)
    {
        $this->report = $report;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['slack'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line('Nouveau signalement')
            ->line('Entreprise : ' . $this->report->place->name)
            ->line('Nom : ' . $this->report->name)
            ->line('Courriel : ' . $this->report->email)
            ->line('Raison : ' . $this->report->reason)
            ->action('Voir les signalements', route("moderation.showReports"));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }

    /**
     * Get the Slack representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return SlackMessage
     */
    public function toSlack($notifiable)
    {
        $url = route("moderation.showReports");

        $slack_fields = [
            'Nom' => $this->report->name,
            'Courriel' => $this->report->email,
            'Raison' => $this->report->reason,
            'Entreprise' => $this->report->place->name,
        ];

        return (new SlackMessage)
                    ->success()
                    ->content('Signalement reçu')
                    ->attachment(function ($attachment) use ($url, $slack_fields) {
                        $attachment->title('Voir les signalements', $url)
                                   ->fields($slack_fields);
                    });
    }
}
