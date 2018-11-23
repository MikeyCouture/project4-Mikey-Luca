// GLOBAL STUFF
const runApp = {};
runApp.apiKey = `AIzaSyBXaDLbvS9m_4euOEdcVxbnybx8D7202C4`;
runApp.apiKeyTwo = `12db71466624332600c66c1d7e474f6d`;
let userlocation;
let locationReturn = {};

//array of blurbs that will be printed to DOM depending on the temperature of userlocation

//


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
        locationReturn.locationName = res.results[0].formatted_address;
        locationReturn.lat = res.results[0].geometry.location.lat;
        locationReturn.lng = res.results[0].geometry.location.lng;
        runApp.weatherInfo(locationReturn.lat, locationReturn.lng);
        $("#locationHeading").append(`${locationReturn.cityName}`);
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


        //creating the object that contains out GET request from darksky
        const weatherReturn = {
            icon: res.currently.icon,
            temperature: Math.floor(res.currently.apparentTemperature), //rounds down temp
            summary: res.currently.summary,
            humidity: Math.floor(res.currently.humidity * 100), //turns humidity % 
            windspeed: (res.currently.windSpeed * 3.6).toFixed(2), //converts to km/h
            //grab UV index
            UVindex: res.currently.uvIndex,

            //requesting the weather forecast
            longIcon: res.hourly.data[2].icon,
            longTemperature: Math.floor(res.hourly.data[2].apparentTemperature), //rounds down temp
            longSummary: res.hourly.data[2].summary,
            longHumidity: Math.floor(res.hourly.data[2].humidity * 100), //turns humidity %
            longWindspeed: (res.hourly.data[2].windSpeed * 3.6).toFixed(2)   //converts to km/h
        };
    
        //call function that prints weatherReturn to DOM
        runApp.weatherPrinter(weatherReturn);
        runApp.blurbCondition(weatherReturn.temperature);
        runApp.headingPrinter(locationReturn.locationName);
        runApp.headingPrinter(locationReturn.locationName);
        runApp.uvIndexChecker(weatherReturn.UVindex);
        runApp.contentDisplay();
<<<<<<< HEAD
        
=======

>>>>>>> 0c936572bded430e41609f445e81ec54a8fd0b94
    });
};


// SUBMIT EVENT LISTENER FOR LOCATION
runApp.listenForSubmit = function(){
    //listen for submit of the form
    $("form").on("submit", function (e) {
        e.preventDefault();
        userlocation = $("#location").val();
        runApp.geocode(userlocation);
<<<<<<< HEAD
        
  
    });
}

runApp.contentDisplay = function(){
=======
    });
}

runApp.contentDisplay = () => {
>>>>>>> 0c936572bded430e41609f445e81ec54a8fd0b94
    $(".returnedContent").fadeIn(2000);
    $(".returnedContent").addClass("returnedContentShow");
};

//function that gets lat/lng from user
runApp.fetchCoordinates = function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        locationReturn.lat = position.coords.latitude;
        locationReturn.lng = position.coords.longitude;
        runApp.weatherInfo(locationReturn.lat, locationReturn.lng);

    });
};

// FUNCTION THAT APPENDS CURRENT WEATHER TO DOM
runApp.weatherPrinter = function (weatherReturn) {
    
    //printing of current weather
    $(".weather").empty();
    $(".longWeather").empty();
    $(".weather").append(`<canvas id="${weatherReturn.icon}" width="80" height="80"></canvas>`);
    $(".weather").append(`<p>Feels Like: ${weatherReturn.temperature}°C</p>`); 
    $(".weather").append(`<p>${weatherReturn.summary}</p>`);
    $(".weather").append(`<p>Humidity: ${weatherReturn.humidity} %</p>`);
    $(".weather").append(`<p>Wind Speed: ${weatherReturn.windspeed} km/h</p>`);  

    //printing of the weather forecast
    $(".longWeather").append(`<canvas id="${weatherReturn.longIcon} 2" width="80" height="80"></canvas>`);
    $(".longWeather").append(`<p>Feels Like: ${weatherReturn.longTemperature}°C</p>`); 
    $(".longWeather").append(`<p>${weatherReturn.longSummary}</p>`);
    $(".longWeather").append(`<p>Humidity: ${weatherReturn.longHumidity} %</p>`);
    $(".longWeather").append(`<p>Wind Speed: ${weatherReturn.longWindspeed} km/h</p>`); 
    //loading ICONS to be placed with everything else 
    runApp.skyConLoader();
};

// CREATING SKYCONS FUNCTION 
runApp.skyConLoader = function(){
    let icons = new Skycons({ "color": "black" });
    icons.set("clear-day", Skycons.CLEAR_DAY);
    icons.set("clear-day 2", Skycons.CLEAR_DAY);
    icons.set("clear-night", Skycons.CLEAR_NIGHT);
    icons.set("clear-night 2", Skycons.CLEAR_NIGHT);
    icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
    icons.set("partly-cloudy-day 2", Skycons.PARTLY_CLOUDY_DAY);
    icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
    icons.set("partly-cloudy-night 2", Skycons.PARTLY_CLOUDY_NIGHT);
    icons.set("cloudy", Skycons.CLOUDY);
    icons.set("cloudy 2", Skycons.CLOUDY);
    icons.set("rain", Skycons.RAIN);
    icons.set("rain 2", Skycons.RAIN);
    icons.set("sleet", Skycons.SLEET);
    icons.set("sleet 2", Skycons.SLEET);
    icons.set("snow", Skycons.SNOW);
    icons.set("snow 2", Skycons.SNOW);
    icons.set("wind", Skycons.WIND);
    icons.set("wind 2", Skycons.WIND);
    icons.set("fog", Skycons.FOG);
    icons.set("fog 2", Skycons.FOG);
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
    runApp.fetchCoordinates();
    // runApp.geocode();
    // runApp.weatherInfo();
}

// Document function ready. runApp init calling other functions
$(function(){
    runApp.init();
});

//Function to check if UVIndex is over 4, if so add it to results
runApp.uvIndexChecker = (uv) => {
    if (uv >= 5) {
        $(".blurb").append("<p>UV Warning! Wear some suncreen!</p>");
        $(".weather").append(`<p>UV Index: ${uv}`);
        $(".longWeather").append(`<p>UV Index: ${uv}`);
    };
}

//function that checks temperature and prints a different string to the screen depending on returned temperature. randomly selects one of multiple possibilities within each result.
runApp.blurbCondition = (temperature) => {
    //create array of comments so they are within scope of function
    const blurbArray = [
        [`It is pretty cold out there, bundle up and be sure to get those miles in`, `Well ${temperature} isn't great, so get some layers on.`, `Ya, you're gonna need a coat. Get out there.`],
        [`Comment Four`, `Nice, ${temperature}. Great for a run.`, `Comment 6ix`],
        [`Comment Seven`, `Comment Eight`, `Watch your hydration level out there and know your limits.`]
    ];

    //if else statement that takes temperature value and decides which array to grab from, randomizing the choice from within array.
    //finalBlurb is the one which will be printed
    let finalBlurb;
    if (temperature < 0) {
        finalBlurb = (blurbArray[0][Math.floor(Math.random() * blurbArray.length)]);
    } else if (temperature < 12) {
        finalBlurb = (blurbArray[1][Math.floor(Math.random() * blurbArray.length)]);
    } else {
        finalBlurb = (blurbArray[2][Math.floor(Math.random() * blurbArray.length)]);
    }
    //print blurb
    runApp.blurbPrinter(finalBlurb);
};
//function that prints blurb to the screen
runApp.blurbPrinter = (blurb) => {
    $(".blurb").empty();
    $('.blurb').append(`${blurb}`);
};
runApp.headingPrinter = (location) => {
    $("#locationHeading").html(`${location}`);
}



runApp.switchermadinger = () => {
    $(".switch").on("click", function(e){
        $(".longWeather").toggleClass("open");
        $(".weather").toggleClass("close");
    });
}

runApp.switchermadinger();



