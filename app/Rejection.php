<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class Rejection extends Model
{
    use LogsActivity;

    protected static $logFillable = true;
    protected static $logName = 'moderation';
    protected static $logOnlyDirty = false;
    protected static $submitEmptyLogs = true;
    
    protected $fillable = ['user_id', 'place_id', 'reason'];

    public function place()
    {
        return $this->belongsTo(Place::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getDescriptionForEvent(string $eventName): string
    {
        switch ($eventName) {
            case 'created':
                $eventNameFrench = 'créé';
                break;

            case 'updated':
                $eventNameFrench = 'mis à jour';
                break;

            case 'deleted':
                $eventNameFrench = 'détruit';
                break;
        }
        return "Un rejet fiche à été {$eventNameFrench}.";
    }
}
