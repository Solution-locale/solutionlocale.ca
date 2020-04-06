<?php
namespace App\Http\Filters;

class PlaceFilter extends QueryFilter
{
    public function name($name)
    {
        $this->builder->where('name', 'LIKE', "%{$name}%");
    }

    public function region($idRegion)
    {
        $this->builder->where('region_id', $idRegion);
    }

    public function isApproved($approved)
    {
        $this->builder->where('is_approved', $approved);
    }

    public function isClosed($closed)
    {
        $this->builder->where('is_closed', $closed);
    }
}
