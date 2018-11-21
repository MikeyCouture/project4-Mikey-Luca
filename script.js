// GLOBAL STUFF
const runApp = {};
runApp.apiKey = `AIzaSyBXaDLbvS9m_4euOEdcVxbnybx8D7202C4`;
let userlocation;
let locationReturn = {};
runApp.apiKeyTwo = `12db71466624332600c66c1d7e474f6d`;
let weatherReturn = {};

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
        // let geoLocation = res.results[0].geometry.location;
        locationReturn.lat = res.results[0].geometry.location.lat;
        locationReturn.lng = res.results[0].geometry.location.lng;
        console.log(locationReturn);
        runApp.weatherInfo(locationReturn.lat, locationReturn.lng)
    });
};

// WEATHER FUNCTION & DARK SKY API AJAX CALL
runApp.weatherInfo = function (res1, res2) {
    $.ajax({
        url: `https://api.darksky.net/forecast/${runApp.apiKeyTwo}/${locationReturn.lat},${locationReturn.lng}`,
        method: "GET",
        dataType: "JSONP"
    }).then((res) => {
        // console.log(res.currently);
        weatherReturn.icon = res.currently.icon;
        weatherReturn.temperature = res.currently.apparentTemperature;
        weatherReturn.summary = res.currently.summary;
        weatherReturn.humidity = res.currently.humidity;
        weatherReturn.windspeed = res.currently.windSpeed;
        console.log(weatherReturn);
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

// RUNNING FUNCTIONS ABOUT - INIT
runApp.init = function(){
    runApp.listenForSubmit();
    // runApp.geocode();
    // runApp.weatherInfo();
}

// Document function ready. runApp init calling other functions
$(function(){
    runApp.init();
});





