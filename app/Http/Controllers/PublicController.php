<?php

namespace App\Http\Controllers;

use App\Category;
use App\Place;
use App\Region;
use App\Utils\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class PublicController extends Controller
{
    const DEFAULT_VIEW = 'liste';
    /**
     * Method retourning sorting info according to an user input.
     * @param: string $in Column on which the user want to sort.
     * @return: array Ex: ['col' => 'real_col_name', 'order' => ('asc'|'desc')].
     */
    private function getSortColumn($in) {
        $in = preg_replace('/[^a-z]/', '', strtolower($in));
        $out = ['col' => 'name', 'order' => 'asc'];

        if ($in === 'nom') {
            $out = ['col' => 'name', 'order' => 'asc'];
        } else if ($in === 'ville') {
            $out = ['col' => 'city', 'order' => 'asc'];
        } else if ($in === 'plusrecent') {
            $out = ['col' => 'created_at', 'order' => 'desc'];
        } else if ($in === 'livraison') {
            $out = ['col' => 'deliveryZone', 'order' => 'desc'];
        }
        return $out;
    }

    /**
     * Method returning view template to use according to an user input.
     * @param: string $in
     * @return: string
     */
    private function getView($in) {
        $in = preg_replace('/[^a-z]/', '', strtolower($in));
        $view = 'cards';
        if ($in === 'grille') {
            return 'grid';
        } else if ($in === 'compact') {
            return 'compact';
        }
        return $view;
    }

    /**
     * Method returning the URL to call for a view.
     * @param string $view
     * @return string
     */
    public static function getViewUrl($view) {
        $parts =  parse_url(url()->full());
        parse_str(@$parts['query'], $params);
        $params['vue'] = $view;
        return url()->current().'?'.http_build_query($params);
    }

    public function index()
    {
        $view = $this->getView(request('vue', self::DEFAULT_VIEW));
        $sort = $this->getSortColumn(request('trierpar', ''));
        return view('index')->with([
            'places' => Place::where('is_approved', true)->orderBy($sort['col'], $sort['order'])->get()->random(5),
            'is_regional' => false,
            'is_provincial' => false,
            'page_title' => config('app.name', ''),
            'view' => $view,
        ]);
    }

    public function indexProvincial()
    {
        $view = $this->getView(request('vue', self::DEFAULT_VIEW));
        $sort = $this->getSortColumn(request('trierpar', ''));
        return view('index')->with([
            'places' => Place::where('is_approved', true)->orderBy($sort['col'], $sort['order'])->get(),
            'is_regional' => false, 
            'is_provincial' => true,
            'page_title' => 'Toute les régions - ' . config('app.name', ''),
            'view' => $view,
        ]);
    }

    public function indexRegional(Region $region)
    {
        $view = $this->getView(request('vue', self::DEFAULT_VIEW));
        $sort = $this->getSortColumn(request('trierpar', ''));
        return view('index')->with([
            'places' => $region->places()->where('is_approved', true)->orderBy($sort['col'], $sort['order'])->get(),
            'selectedRegion' => $region,
            'is_regional' => true,
            'is_provincial' => false,
            'page_title' => $region->getPageTitle(),
            'view' => $view,
        ]);
    }

    public function indexRegionalCategories(Region $region, $category)
    {
        $view = $this->getView(request('vue', self::DEFAULT_VIEW));
        $category = Category::where('slug', $category)->first();
        $sort = $this->getSortColumn(request('trierpar', ''));
        $places = $category->places()->where('is_approved', true)->where('places.region_id', $region->id)->orderBy($sort['col'], $sort['order'])->get();

        return view('index')->with([
            'places' => $places,
            'selectedRegion' => $region,
            'is_regional' => true,
            'category' => $category,
            'is_provincial' => false,
            'page_title' => $category->getPageTitle(),
            'view' => $view,
        ]);
    }
}
