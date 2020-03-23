// Algolia Places 
var places = require('places.js');

const fixedOptions = {
  appId: process.env.MIX_ALGOLIA_PLACES_APP_IP,
  apiKey: process.env.MIX_ALGOLIA_PLACES_KEY,
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