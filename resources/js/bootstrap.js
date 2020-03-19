window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });

// Algolia Places 
var places = require('places.js');

const fixedOptions = {
  appId: 'plJBE2GZITUG',
  apiKey: 'cd0aff4d3cec724246d29efc4cfd1b21',
  container: document.querySelector('#address'),
};

const reconfigurableOptions = {
  language: 'fr',
  countries: ['ca', 'ru'],
};
const placesInstance = places(fixedOptions).configure(reconfigurableOptions);

// dynamically reconfigure options
// placesInstance.configure({
//   countries: ['us'] // only search in the United States, the rest of the settings are unchanged: we're still searching for cities in German.
// })

var $address = document.querySelector('#address-value')
var $addressData = document.querySelector('#address-data')

placesInstance.on('change', function(e) {
  	$addressData.value = JSON.stringify(e.suggestion)
    $address.textContent = e.suggestion.value
});

placesInstance.on('clear', function() {
	$address.textContent = 'Aucune';
});

