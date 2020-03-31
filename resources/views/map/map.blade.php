@extends('layouts.public')

@php
function generateSanitizedPlaceData($place)
{
    return json_encode($place);
}
@endphp

@section('styles-head')
<link href="https://api.mapbox.com/mapbox-gl-js/v1.9.0/mapbox-gl.css" rel="stylesheet" />
<style>
    body, html { margin: 0; padding: 0; height: 100%; }
    main { height: calc(100% - 145px); }
    #map-wrapper {position: relative; min-height: 500px; height: 100%; width: 100%; }
	#map { position: absolute; top: 0; bottom: 0; width: 100%; }
    .mapboxgl-popup {max-width:300px!important; min-width:220px;}
    @media only screen and (max-width: 600px){
        .mapboxgl-popup {max-width:240px!important;}
    }
    .mapboxgl-popup-close-button {font-size:17px; height:40px;}
    .mapboxgl-popup-content {padding:0!important; overflow:hidden; border-radius:5px;}
    .mapboxgl-popup-content header {background-color:#f9f9f9; padding:10px 24px 10px 10px; font-weight:600; text-align:left; width:100%; text-shadow: 0px 1px 1px rgba(255,255,255,0.5); font-size:16px;     border-bottom: 1px solid #ddd;
}
    .mapboxgl-popup-content .address-content {padding:10px; margin:0;}
    .mapboxgl-popup-content .address-content div {padding:0; margin-bottom:15px; color:#111; font-size:13px; }
    .mapboxgl-popup-content .address-content div:last-of-type {margin-bottom:0px;}
        .mapboxgl-popup-content .address-content i {color:#8c9196; font-size:16px; margin-right:5px;display:inline-block;}
        .mapboxgl-popup-content .address-content span {}
    .mapboxgl-popup-content .popup-footer {width:100%; border-top:1px solid #ddd; text-align:center; font-size:16px; color:#111; padding:0px;}
    .mapboxgl-popup-content .popup-footer a {display:block; width:100%; height:100%; padding:10px;  color:#111; transition:all 250ms ease-out; text-decoration: none; background-color:#82b98a; border-right:1px solid rgba(0,0,0,0.1);}
    .mapboxgl-popup-content .popup-footer a:last-of-type {border-right:none;}
    .mapboxgl-popup-content .popup-footer a i {margin-right:5px; font-size:16px; color:#fff;}
    .mapboxgl-popup-content .popup-footer a:hover {background-color:#5c9865;}
    .mapboxgl-popup-content .badge-container {padding:2px 0px 2px 5px;}
        .mapboxgl-popup-content .badge-container .badge {font-size:11px; display:inline-block; margin:0px 5px 5px 0px;}

    .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {border-top-color: #82b889;}
    .mapboxgl-popup-anchor-top .mapboxgl-popup-tip {border-bottom-color: #f9f9f9;}

</style>
@endsection

@section('scripts-body')
    <script type="text/javascript">

        function generatePlaceHTML(place)
        {
            var innerHTML = '';
            innerHTML += '<header>'+place.name+'</header>';

            if(place.address)
            {
                innerHTML += '<div class="address-content">';
                innerHTML += '<div class="d-flex align-content-center"><i class="fas fa-map-marker-alt"></i> <span class="flex-grow-1">'+place.address+', ' + place.city + '</span></div>';
                innerHTML += '</div>';
            }

            innerHTML += '<div class="badge-container">';
                
            if(place.categories && place.categories.length > 0)
            {
                for(var i = 0; i < place.categories.length; i++)
                {
                    var category = place.categories[i];
                    innerHTML += '<div class="badge badge-primary">'+category.name+'</div>';
                }
                
            }

            if(place.delivery && place.delivery.length > 0)
            {
                for(var j = 0; j < place.delivery.length; j++)
                {
                    var delivery = place.delivery[j];
                    innerHTML += '<div class="badge badge-secondary">'+delivery.name+'</div>';
                }
            }
            innerHTML += '</div>';

            innerHTML += '<div class="popup-footer d-flex align-content-center">';
                if(place.url){
                    innerHTML += '<a href="'+place.url+'" target="_blank" class="flex-grow-1" title="Site web"><i class="fas fa-link"></i></a>';
                }
                if(place.phoneNumber)
                {
                    innerHTML += '<a href="tel:'+place.phoneNumber+'"  class="flex-grow-1" title="Téléphone"><i class="fas fa-phone"></i></a>';
                }
                innerHTML += '<a href="/entreprise/'+place.slug+'"  class="flex-grow-1" title="Fiche de l\'entreprise"><i class="fas fa-address-card"></i></a>';
            innerHTML += '</div>';

            

            return innerHTML;
        }

        $(function() {
            window.mapboxgl.accessToken = 'pk.eyJ1Ijoib2tpZG9vIiwiYSI6ImNrOGVpNjZsMTE1Ym4zZWw2YWJuNDFtOHYifQ.j9TamQ7clfM4xYNXkTtVKw';

            var map = new window.mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v9',
                zoom: 5.338278866434004,
                center: {lng: -72.69407606492541, lat: 46.205834144697576}
            });

            map.on('load', function() {
                map.loadImage(
                    '/images/pin-gris.png',
                    function(error, image) {
                        if (error) throw error;

                        map.addImage('pin-gris', image);

                        map.addSource('places', {
                            'type': 'geojson',
                            'cluster': true,
                            'clusterMaxZoom': 12, // Max zoom to cluster points on
                            'clusterRadius': 50, // Radius of each cluster when clustering points (defaults to 50)
                            'data': {
                                'type': 'FeatureCollection',
                                'features': [
                                    @foreach($places as $place)
                                    {
                                        'type': 'Feature',
                                        'properties': {
                                            'description': @php echo generateSanitizedPlaceData($place); @endphp,
                                        },
                                        'geometry': {
                                            'type': 'Point',
                                            'coordinates': [{{ $place->long }}, {{ $place->lat }}]
                                        }
                                    },
                                    @endforeach
                                ]
                            }
                        });

                        map.addLayer({
                            id: 'clusters',
                            type: 'circle',
                            source: 'places',
                            filter: ['has', 'point_count'],
                            paint: {
                                // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                                // with three steps to implement three types of circles:
                                //   * Blue, 20px circles when point count is less than 100
                                //   * Yellow, 30px circles when point count is between 100 and 750
                                //   * Pink, 40px circles when point count is greater than or equal to 750
                                'circle-color': [
                                    'step',
                                    ['get', 'point_count'],
                                    '#838383',
                                    100,
                                    '#838383',
                                    750,
                                    '#838383'
                                ],
                                'circle-radius': [
                                    'step',
                                    ['get', 'point_count'],
                                    20,
                                    100,
                                    30,
                                    750,
                                    40
                                ]
                            }
                        });

                        map.addLayer({
                            id: 'cluster-count',
                            type: 'symbol',
                            source: 'places',
                            filter: ['has', 'point_count'],
                            layout: {
                                'text-field': '{point_count_abbreviated}',
                                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                                'text-size': 12
                            }
                        });

                        // Add a layer showing the places.
                        map.addLayer({
                            'id': 'places',
                            'type': 'symbol',
                            'source': 'places',
                            'filter': ['!', ['has', 'point_count']],
                            'layout': {
                                'icon-image': 'pin-gris',
                                'icon-size': 0.4,
                                'icon-allow-overlap': true
                            }
                        });

                        // Add geolocate control to the map.
                        map.addControl(
                            new mapboxgl.GeolocateControl({
                                positionOptions: {
                                    enableHighAccuracy: true
                                },
                                trackUserLocation: true
                            })
                        );

                        map.on('click', 'clusters', function (e) {
                            var features = map.queryRenderedFeatures(e.point, {
                                layers: ['clusters']
                            });
                            var clusterId = features[0].properties.cluster_id;
                            map.getSource('places').getClusterExpansionZoom(
                                clusterId,
                                function (err, zoom) {
                                    if (err) return;

                                    map.easeTo({
                                        center: features[0].geometry.coordinates,
                                        zoom: zoom
                                    });
                                }
                            );
                        });

                        // When a click event occurs on a feature in the places layer, open a popup at the
                        // location of the feature, with description HTML from its properties.
                        map.on('click', 'places', function (e) {
                            var coordinates = e.features[0].geometry.coordinates.slice();
                            var description = e.features[0].properties.description;

                            // Ensure that if the map is zoomed out such that multiple
                            // copies of the feature are visible, the popup appears
                            // over the copy being pointed to.
                            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                            }

                            var placeJson = JSON.parse(description);

                            var popup = new mapboxgl.Popup()
                                .setLngLat(coordinates)
                                .setHTML("loading...")
                                .addTo(map);

                                $.getJSON("/entreprise/json/"+placeJson.slug, function(emp) { 
                                    popup.setHTML(generatePlaceHTML(emp));
                                }); 
                        });

                        // Change the cursor to a pointer when the mouse is over the places layer.
                        map.on('mouseenter', 'clusters', function () {
                            map.getCanvas().style.cursor = 'pointer';
                        });

                        // Change it back to a pointer when it leaves.
                        map.on('mouseleave', 'clusters', function () {
                            map.getCanvas().style.cursor = '';
                        });

                        // Change the cursor to a pointer when the mouse is over the places layer.
                        map.on('mouseenter', 'places', function () {
                            map.getCanvas().style.cursor = 'pointer';
                        });

                        // Change it back to a pointer when it leaves.
                        map.on('mouseleave', 'places', function () {
                            map.getCanvas().style.cursor = '';
                        });
                    }
                );
            });
        });
    </script>
@endsection

@section('content')
    <main role="main">
        <div id="map-wrapper">
            <div id="map"></div>
        </div>
    </main>
@endsection