<?php

namespace App;

use App\Http\Filters\Filterable;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class Place extends Model
{
    use Filterable;
    use LogsActivity;

    protected static $logFillable = true;
    protected static $logName = 'moderation';
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;

    protected $fillable = [
        'name', 'address', 'address_2', 'province', 'region_id', 'subRegion', 'city', 'countryCode', 'postalCode', 'phoneNumber', 'additionnalPhoneNumber', 'email', 'url', 'facebook_url', 'long', 'lat', 'deliveryZone', 'hide_address', 'rcm_id', 'plus_code', 'is_approved', 'is_closed'
    ];

    protected $hidden = [
        'long', 'lat',
    ];

    protected $dates = [
        'normalized_at',
    ];

    public function rejection()
    {
        return $this->hasOne(Rejection::class);
    }

    public function partner()
    {
        return $this->belongsTo(Partner::class);
    }

    public function region()
    {
        return $this->belongsTo(Region::class);
    }

    public function rcm()
    {
        return $this->belongsTo(Rcm::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function types()
    {
        return $this->belongsToMany(PlaceType::class);
    }

    public function delivery()
    {
        return $this->belongsToMany(DeliveryType::class);
    }

    public function getCompleteAddressAttribute()
    {
        return "{$this->address}, {$this->city}, {$this->province}, {$this->postalCode}";
    }
  
    /**
     * Method returning the page title of the object.
     * @return string
     */
    public function getPageTitle(): string
    {
        $midName = @$this->region->name ? " - {$this->region->name} - " : ' - ';
        return "{$this->name}{$midName}".config('app.name', '');
    }

    #SCOPES
    public function scopeOpened($query)
    {
        return $query->where('is_closed', 0);
    }

    /**
     * Method for search places by keywords.
     * @param string $q
     * @return Illuminate\Database\Eloquent\Collection
     */
    public static function searchByKeyword($q, $sortBy = null, $sortOrder = null)
    {
        $like = '%'.str_replace(' ', '%', $q).'%';
        $search = 'is_approved and rejection_id IS NULL and (name like ? or address like ? or city like ?)';
        $bindings = [$like, $like, $like];

        $sortBy = $sortBy ?? 'name';
        $sortOrder = $sortOrder ?? 'asc';
        return parent::whereRaw($search, $bindings)->orderBy($sortBy, $sortOrder)->get();
    }

    /**
     * Method for counting places corresponding some keywords.
     * @param string $q
     * @return int
     */
    public static function countByKeyword($q)
    {
        $places = self::searchByKeyword($q);
        return count($places);
    }

    public function getDescriptionForEvent(string $eventName): string
    {
        switch ($eventName) {
            case 'created':
                $eventNameFrench = 'créée';
                break;

            case 'updated':
                $eventNameFrench = 'mise à jour';
                break;

            case 'deleted':
                $eventNameFrench = 'détruite';
                break;
        }
        return "Cette fiche à été {$eventNameFrench}.";
    }
}
