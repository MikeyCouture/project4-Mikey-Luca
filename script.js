
initAutocomplete = (id) => {
   new google.maps.places.Autocomplete(document.getElementById(id));
}

app.getDestinationInfo = (location) => {
   const geocoder = new google.maps.Geocoder();
   geocoder.geocode({
      'address': location
   }, (results, status) => {
      // if there is no error, filter the result so that the component is a "country"
      if (status == google.maps.GeocoderStatus.OK) {
         const addressComponents = results[0].address_components.filter((component) => {
            return component.types[0] === 'country';
         });
         // out of the results of the filter, get the info and populate the app.destination object
        
         app.destination.lat = results[0].geometry.location.lat();
         app.destination.lng = results[0].geometry.location.lng();
         app.getWeather(app.destination.lat, app.destination.lng);
         app.getCurrency(app.destination.countryCode);
         app.getCityCode(app.destination.lat, app.destination.lng);
         app.getLanguage(app.destination.countryCode);
         app.getAirports(app.destination.lat, app.destination.lng);
         console.log(app.destination.countryCode);
      } else {
         alert("Something went wrong." + status);
      }
   });
}