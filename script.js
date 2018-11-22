// GLOBAL STUFF
const runApp = {};
runApp.apiKey = `AIzaSyBXaDLbvS9m_4euOEdcVxbnybx8D7202C4`;
runApp.apiKeyTwo = `12db71466624332600c66c1d7e474f6d`;
let userlocation;
let locationReturn = {};
const blurbArray =  [
    ["Comment One", "Comment Two", "Comment Three"],
    ["Comment Four", "Comment Five", "Comment 6ix"],
    ["Comment Seven", "Comment Eight", "Comment Nine"]
];

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
        console.log(res);
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
        dataType: "JSONP",
        data: {
            units: "si"
        }
    }).then((res) => {
        console.log(res);
        const weatherReturn = {
            icon: res.currently.icon,
            temperature: res.currently.apparentTemperature,
            summary: res.currently.summary,
            humidity: res.currently.humidity,
            windspeed: res.currently.windSpeed, //meters per second
            longIcon: res.hourly.data[0].icon,
            longTemperature: res.hourly.data[0].apparentTemperature,
            longSummary: res.hourly.data[0].summary,
            longHumidty: res.hourly.data[0].humidity,
            longWindspeed: res.hourly.data[0].windSpeed 
        };
        console.log(weatherReturn);

        //call function that prints weatherReturn to DOM
        runApp.weatherPrinter(weatherReturn);
        runApp.blurbCondition(weatherReturn.temperature);
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

// FUNCTION THAT APPENDS CURRENT WEATHER TO DOM
runApp.weatherPrinter = function (weatherReturn) {

    $(".weather").empty();
    $(".weather").append(`<canvas id= "${weatherReturn.icon}" width="80" height="80"></canvas>`);
    $(".weather").append(`<p>Feels Like: ${Math.floor(weatherReturn.temperature)} °C</p>`);
    $(".weather").append(`<p>${weatherReturn.summary}</p>`);
    $(".weather").append(`<p>Humidity: ${Math.floor(weatherReturn.humidity * 100)} %</p>`);
    $(".weather").append(`<p>Wind Speed: ${(weatherReturn.windspeed * 3.6).toFixed(2)} km/h</p>`);
    runApp.skyConLoader();
};

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

runApp.blurbCondition = (temperature) => {
    let finalBlurb;
    console.log(finalBlurb);
    if (temperature < 0) {
        finalBlurb = (blurbArray[0][Math.floor(Math.random()
            * blurbArray.length)]);
    } else if (temperature < 12) {
        finalBlurb = (blurbArray[1][Math.floor(Math.random()
            * blurbArray.length)]);
    } else {
        finalBlurb = (blurbArray[2][Math.floor(Math.random()
            * blurbArray.length)]);
    }
    console.log(finalBlurb);
    // this where we would append said Var to DOM 
    runApp.blurbPrinter(finalBlurb);
};





runApp.blurbPrinter = (blurb) => {
    $(".blurb").empty();
    $('.blurb').append(`${blurb}`);

};







