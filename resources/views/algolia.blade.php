@extends('layouts.public')

@section('content')
<main role="main">
    <br><br><br><br><br>
  <div id="searchbox"></div>
  <div id="hits"></div>
</main>
@endsection

@section('styles-head')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css" integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css" integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8=" crossorigin="anonymous">
@endsection

@section('scripts-body')
<script src="https://cdn.jsdelivr.net/npm/algoliasearch@4.0.0/dist/algoliasearch-lite.umd.js" integrity="sha256-MfeKq2Aw9VAkaE9Caes2NOxQf6vUa8Av0JqcUXUGkd0=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/instantsearch.js@4.0.0/dist/instantsearch.production.min.js" integrity="sha256-6S7q0JJs/Kx4kb/fv0oMjS855QTz5Rc2hh9AkIUjUsk=" crossorigin="anonymous"></script>

<script>
    const searchClient = algoliasearch({{ config('scout.algolia.id') }}, {{ Algolia\ScoutExtended\Facades\Algolia::searchKey(App\Place::class) }});

    const search = instantsearch({
    indexName: {{ (new App\Place)->searchableAs() }},
    searchClient,
    });

    search.addWidgets([
    instantsearch.widgets.searchBox({
        container: '#searchbox',
    }),

    instantsearch.widgets.hits({
        container: '#hits',
    })
    ]);

    search.start();

</script>
@endsection
