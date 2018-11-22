// GLOBAL STUFF
const runApp = {};
runApp.apiKey = `AIzaSyBXaDLbvS9m_4euOEdcVxbnybx8D7202C4`;
let userlocation;
let locationReturn = {};
runApp.apiKeyTwo = `12db71466624332600c66c1d7e474f6d`;

// LOCATION FUNCTION & GOOGLE API AJAX CALL
runApp.geocode = function (userlocation) {
    $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBXaDLbvS9m_4euOEdcVxbnybx8D7202C4`,
        method: "GET",
        dataType: "JSON",
        data: {
            address: userlocation
        }
    }).then((res) => {
        // console.log(res);
        // let geoLocation = res.results[0].geometry.location;
        locationReturn.cityName = res.results[0].formatted_address;
        locationReturn.lat = res.results[0].geometry.location.lat;
        locationReturn.lng = res.results[0].geometry.location.lng;
        console.log(locationReturn);
        runApp.weatherInfo(locationReturn.lat, locationReturn.lng);
    });
};

// WEATHER FUNCTION & DARK SKY API AJAX CALL
runApp.weatherInfo = function (res1, res2) {
    $.ajax({
        url: `https://api.darksky.net/forecast/${runApp.apiKeyTwo}/${locationReturn.lat},${locationReturn.lng}`,
        method: "GET",
        dataType: "JSONP"
    }).then((res) => {
        // console.log(res);
        const weatherReturn = {
            icon: res.currently.icon,
            temperature: res.currently.apparentTemperature,
            summary: res.currently.summary,
            humidity: res.currently.humidity,
            windspeed: res.currently.windSpeed
        };
        console.log(weatherReturn);
        //call function that prints weatherReturn to DOM
        let weatherPrinter = function () {
            $(".weather").empty();
            $(".weather").append(`<canvas id= "${weatherReturn.icon}" width="80" height="80"></canvas>`);
            $(".weather").append(`<p>${weatherReturn.temperature}</p>`);
            $(".weather").append(`<p>${weatherReturn.summary}</p>`);
            $(".weather").append(`<p>${weatherReturn.humidity}</p>`);
            $(".weather").append(`<p>${weatherReturn.windspeed}</p>`);
            runApp.skyConLoader();
        };
        weatherPrinter();
    });
};

// SUBMIT EVENT LISTENER FOR LOCATION
runApp.listenForSubmit = function(){
    $("form").on("submit", function (e) {
        e.preventDefault();
        let userlocation = $("#location").val();
        console.log(userlocation);
        runApp.geocode(userlocation);
    });
}

// CREATING SKYCONS FUNCTION
runApp.skyConLoader = function(){
    let icons = new Skycons({ "color": "black" });
    icons.set("clear-day", Skycons.CLEAR_DAY);
    icons.set("clear-night", Skycons.CLEAR_NIGHT);
    icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
    icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
    icons.set("cloudy", Skycons.CLOUDY);
    icons.set("rain", Skycons.RAIN);
    icons.set("sleet", Skycons.SLEET);
    icons.set("snow", Skycons.SNOW);
    icons.set("wind", Skycons.WIND);
    icons.set("fog", Skycons.FOG);
    icons.play();
};

// USING GOOGLE AUTOCOMPLETE FUNCTION
runApp.initAutocomplete = (id) => {
    new google.maps.places.Autocomplete(document.getElementById(id));
}

// RUNNING FUNCTIONS - INIT
runApp.init = function(){
    runApp.listenForSubmit();
    runApp.initAutocomplete("location");
    // runApp.geocode();
    // runApp.weatherInfo();
}

// Document function ready. runApp init calling other functions
$(function(){
    runApp.init();
});





