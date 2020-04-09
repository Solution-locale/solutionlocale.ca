<?php

namespace App\Http\Controllers;

use App\Category;
use App\Place;
use App\Region;
use App\Utils\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;

class PublicController extends Controller
{

    public function index()
    {
        $viewTemplate = $this->getViewTemplate(request('vue', config('soloc.places-list-default-view')));
        $sort = $this->getSortColumn(request('trierpar', ''));

        $total_places = Cache::remember('total_places', 300, function () {
            return Place::where('is_approved', true)->count();
        });

        return view('indexes.welcome')->with([
            'total_places' => $total_places,
            'places' => Place::where('is_approved', true)->where('is_closed', false)->orderBy($sort['col'], $sort['order'])->get()->random(6),
            'page_title' => config('app.name', ''),
            'viewTemplate' => $viewTemplate,
        ]);
    }

    public function indexProvincial()
    {
        $viewTemplate = $this->getViewTemplate(request('vue', config('soloc.places-list-default-view')));
        $sort = $this->getSortColumn(request('trierpar', ''));
        return view('indexes.provincial')->with([
            'places' => Place::where('is_approved', true)->where('is_closed', false)->orderBy($sort['col'], $sort['order'])->get(),
            'page_title' => 'Toute les régions - ' . config('app.name', ''),
            'viewTemplate' => $viewTemplate,
        ]);
    }

    public function indexRegional(Region $region)
    {
        $viewTemplate = $this->getViewTemplate(request('vue', config('soloc.places-list-default-view')));
        $sort = $this->getSortColumn(request('trierpar', ''));
        return view('indexes.regional')->with([
            'categories' => Category::whereNull('parent_id')->get(),
            'places' => $region->places()->where('is_approved', true)->where('is_closed', false)->orderBy($sort['col'], $sort['order'])->get(),
            'selectedRegion' => $region,
            'page_title' => $region->getPageTitle(),
            'viewTemplate' => $viewTemplate,
        ]);
    }

    public function indexRegionalCategories(Region $region, $category)
    {
        $viewTemplate = $this->getViewTemplate(request('vue', config('soloc.places-list-default-view')));
        $category = Category::where('slug', $category)->first();

        if (is_null($category)) {
            return redirect('/', 308)->with('status', 'Cette catégorie est introuvable ou a peut-être récemment été changée. Merci de réessayer !');
        }
        
        $sort = $this->getSortColumn(request('trierpar', ''));
        $places = $category->places()
                    ->where('is_approved', true)
                    ->where('places.region_id', $region->id)
                    ->where('is_closed', false)
                    ->orderBy($sort['col'], $sort['order'])
                    ->get();

        return view('indexes.categories')->with([
           'categories' => $category->children,
            'places' => $places,
            'selectedRegion' => $region,
            'category' => $category,
            'page_title' => $category->getPageTitle(),
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

        return view('indexes.search')->with([
            'places' => $places,
            'page_title' => "{$q} - ".config('app.name', ''),
            'q' => $q,
            'viewTemplate' => $viewTemplate,
        ]);
    }

    public function teamPage()
    {
        return view("team");
    }

    public function aboutPage()
    {
        return view("about");
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
        $view = 'indexes.view-cards';
        if ($in === 'grille') {
            return 'indexes.view-grid';
        } elseif ($in === 'compact') {
            return 'indexes.view-compact';
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

    public function feeDents()
    {
        return view("places.fee-dents");
    }
}
