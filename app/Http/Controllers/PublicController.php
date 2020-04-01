<?php

namespace App\Http\Controllers;

use App\Category;
use App\Place;
use App\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class PublicController extends Controller
{

    public function index()
    {
        $viewTemplate = $this->getViewTemplate(request('vue', config('soloc.places-list-default-view')));
        $sort = $this->getSortColumn(request('trierpar', ''));
        return view('index')->with([
            'places' => Place::where('is_approved', true)->orderBy($sort['col'], $sort['order'])->get()->random(6),
            'is_regional' => false,
            'is_provincial' => false,
            'page_title' => config('app.name', ''),
            'is_search' => false,
            'viewTemplate' => $viewTemplate,
        ]);
    }

    public function indexProvincial()
    {
        $viewTemplate = $this->getViewTemplate(request('vue', config('soloc.places-list-default-view')));
        $sort = $this->getSortColumn(request('trierpar', ''));
        return view('index')->with([
            'places' => Place::where('is_approved', true)->orderBy($sort['col'], $sort['order'])->get(),
            'is_regional' => false,
            'is_provincial' => true,
            'page_title' => 'Toute les régions - ' . config('app.name', ''),
            'is_search' => false,
            'viewTemplate' => $viewTemplate,
        ]);
    }

    public function indexRegional(Region $region)
    {
        $viewTemplate = $this->getViewTemplate(request('vue', config('soloc.places-list-default-view')));
        $sort = $this->getSortColumn(request('trierpar', ''));
        return view('index')->with([
            'categories' => Category::all(),
            'places' => $region->places()->where('is_approved', true)->orderBy($sort['col'], $sort['order'])->get(),
            'selectedRegion' => $region,
            'is_regional' => true,
            'is_provincial' => false,
            'page_title' => $region->getPageTitle(),
            'is_search' => false,
            'viewTemplate' => $viewTemplate,
        ]);
    }

    public function indexRegionalCategories(Region $region, $category)
    {
        $viewTemplate = $this->getViewTemplate(request('vue', config('soloc.places-list-default-view')));
        $category = Category::where('slug', $category)->first();
        $sort = $this->getSortColumn(request('trierpar', ''));
        $places = $category->places()->where('is_approved', true)->where('places.region_id', $region->id)->orderBy($sort['col'], $sort['order'])->get();

        return view('index')->with([
           'categories' => Category::all(),
            'places' => $places,
            'selectedRegion' => $region,
            'is_regional' => true,
            'category' => $category,
            'is_provincial' => false,
            'page_title' => $category->getPageTitle(),
            'is_search' => false,
            'viewTemplate' => $viewTemplate,
        ]);
    }

    /**
     * Method for searching places.
     */
    public function indexSearch($region = null)
    {
        $viewTemplate = $this->getViewTemplate(request('vue', config('soloc.places-list-default-view')));
        $sort = $this->getSortColumn(request('trierpar', ''));
        $q = request('q');
        if (!$region) {
            $places = Place::searchByKeyword($q, $sort['col'], $sort['order']);
        } else {
            $region = Region::where('slug', $region)->get()->first();
            if (!$region) {
                return abort(404);
            }
            $places = $region->searchPlacesByKeyword($q, $sort['col'], $sort['order']);
        }

        return view('index')->with([
            'places' => $places,
            'is_regional' => false,
            'is_provincial' => false,
            'page_title' => "{$q} - ".config('app.name', ''),
            'is_search' => true,
            'q' => $q,
            'viewTemplate' => $viewTemplate,
        ]);
    }

    /**
     * Method retourning sorting info according to an user input.
     * @param: string $in Column on which the user want to sort.
     * @return: array Ex: ['col' => 'real_col_name', 'order' => ('asc'|'desc')].
     */
    private function getSortColumn($in)
    {
        $in = preg_replace('/[^a-z]/', '', strtolower($in));
        $out = ['col' => 'name', 'order' => 'asc'];

        if ($in === 'nom') {
            $out = ['col' => 'name', 'order' => 'asc'];
        } elseif ($in === 'ville') {
            $out = ['col' => 'city', 'order' => 'asc'];
        } elseif ($in === 'plusrecent') {
            $out = ['col' => 'created_at', 'order' => 'desc'];
        } elseif ($in === 'livraison') {
            $out = ['col' => 'deliveryZone', 'order' => 'desc'];
        }
        return $out;
    }

    /**
     * Method returning view template to use according to an user input.
     * @param: string $in
     * @return: string
     */
    private function getViewTemplate($in)
    {
        $in = preg_replace('/[^a-z]/', '', strtolower($in));
        $view = 'index-place-cards';
        if ($in === 'grille') {
            return 'index-place-grid';
        } elseif ($in === 'compact') {
            return 'index-place-compact';
        }
        return $view;
    }

    /**
     * Method returning the URL to call for a view.
     * @param string $view
     * @return string
     */
    public static function getViewUrl($view)
    {
        $parts =  parse_url(url()->full());
        parse_str(@$parts['query'], $params);
        $params['vue'] = $view;
        return url()->current().'?'.http_build_query($params);
    }
}
