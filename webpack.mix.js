const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/backend.js', 'public/js/backend.js')
	.js('resources/js/frontend.js', 'public/js/frontend.js')
	.extract(['vue', 'jquery', 'lodash', 'popper.js', 'axios'])
	.sass('resources/sass/backend.scss', 'public/css/backend.css')
	.sass('resources/sass/frontend.scss', 'public/css/frontend.css');
