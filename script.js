// GLOBAL STUFF
const runApp = {};
//saving API keys
runApp.apiKeyGoogle = `AIzaSyBXaDLbvS9m_4euOEdcVxbnybx8D7202C4`;
runApp.apiKeyDS = `12db71466624332600c66c1d7e474f6d`;
//locationReturn is global due because it is needed in both our GEOCODE function and weatherInfo function
let locationReturn = {};

//LOCATION FUNCTION & GOOGLE API AJAX CALL ---- accepts input and passes it as 'userlocation'
runApp.geocode = function (userlocation) {
    $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?key=${this.apiKeyGoogle}`,
        method: "GET",
        dataType: "JSON",
        data: {
            address: userlocation
        }
    }).then((res) => {
        //populating locationReturn object with returned info from google API
        locationReturn.locationName = res.results[0].formatted_address;
        locationReturn.lat = res.results[0].geometry.location.lat;
        locationReturn.lng = res.results[0].geometry.location.lng;
        //passing lat + lng from API into weatherInfo function
        runApp.weatherInfo(locationReturn.lat, locationReturn.lng);
    });
};

// WEATHER FUNCTION & DARK SKY API AJAX CALL
runApp.weatherInfo = function (res1, res2) {
    $.ajax({
        url: `https://api.darksky.net/forecast/${runApp.apiKeyDS}/${locationReturn.lat},${locationReturn.lng}`,
        method: "GET",
        dataType: "JSONP",
        data: {
            units: "si"
        }
    }).then((res) => {
        //creating the object that contains out GET request from darksky
        const weatherReturn = {
            //defining current weather keys
            icon: res.currently.icon,
            temperature: Math.floor(res.currently.apparentTemperature), //rounds down temp
            temperatureFar: Math.floor((res.currently.apparentTemperature * 1.8) + 32), //converts Celcius return to Farhenheit
            summary: res.currently.summary,
            humidity: Math.floor(res.currently.humidity * 100), //turns humidity into % 
            windspeed: (res.currently.windSpeed * 3.6).toFixed(2), //converts to km/h
            //grab UV index
            UVindex: res.currently.uvIndex,

            //defining weather forecast keys
            longIcon: res.hourly.data[2].icon,
            longTemperature: Math.floor(res.hourly.data[2].apparentTemperature), //rounds down temp
            longTemperatureFar: Math.floor((res.hourly.data[2].apparentTemperature * 1.8) + 32), //converts Celcius return to Farhenheit
            longSummary: res.hourly.data[2].summary,
            longHumidity: Math.floor(res.hourly.data[2].humidity * 100), //turns humidity into %
            longWindspeed: (res.hourly.data[2].windSpeed * 3.6).toFixed(2)   //converts to km/h
        };
    
        //call functions that prints/blurb/UVindex weatherReturn to DOM
        runApp.weatherPrinter(weatherReturn);
        runApp.blurbCondition(weatherReturn.temperature, weatherReturn.temperatureFar);
        runApp.headingPrinter(locationReturn.locationName);
        runApp.uvIndexChecker(weatherReturn.UVindex);
        console.log(weatherReturn.longTemperatureFar);
    });
};


//function that listens for form submit 
runApp.listenForSubmit = function(){
    $("form").on("submit", function (e) {
        e.preventDefault();
        //takes input from user, creating a string that is passed through geocode function
        userlocation = $("#location").val();
        runApp.geocode(userlocation);
        runApp.contentDisplay();
    });
}

//function that runs on submit and adds a "show" class and fade in to returned content + footer
runApp.contentDisplay = () => {
    setTimeout(function () { 
        $(".returnedContent").fadeIn(900);
        $(".returnedContent").addClass("returnedContentShow");
        $("footer").toggle();
    }, 200);
};

//function that smooth scrolls on click of button to the returned content
runApp.smoothScroll = () => {
    $("button").on("click", function (e) {
        $("html, body").animate({ scrollTop: $(window).height() }, 1200);
    });
};

// FUNCTION THAT APPENDS CURRENT WEATHER TO DOM
runApp.weatherPrinter = function (weatherReturn) {
    //printing of current weather (appending current weather to DOM)
    $(".weather").empty();
    $(".longWeather").empty();
    $(".weather").append(`<h3>Current Weather</h3>`);
    $(".weather").append(`<canvas id="${weatherReturn.icon}" width="80" height="80"></canvas>`);
    $(".weather").append(`<p>Feels Like: ${weatherReturn.temperature}°C / ${weatherReturn.temperatureFar}°F</p>`); 
    $(".weather").append(`<p>${weatherReturn.summary}</p>`);
    $(".weather").append(`<p>Humidity: ${weatherReturn.humidity} %</p>`);
    $(".weather").append(`<p>Wind Speed: ${weatherReturn.windspeed} km/h</p>`);  

    //printing of the weather forecast (appending longWeather to DOM)
    $(".longWeather").append(`<h3>Two Hour Forecast</h3>`)
    $(".longWeather").append(`<canvas id="${weatherReturn.longIcon} 2" width="80" height="80"></canvas>`);
    $(".longWeather").append(`<p>Feels Like: ${weatherReturn.longTemperature}°C / ${weatherReturn.longTemperatureFar}°F</p>`); 
    $(".longWeather").append(`<p>${weatherReturn.longSummary}</p>`);
    $(".longWeather").append(`<p>Humidity: ${weatherReturn.longHumidity} %</p>`);
    $(".longWeather").append(`<p>Wind Speed: ${weatherReturn.longWindspeed} km/h</p>`); 

    //loading ICONS to be placed with everything else 
    runApp.skyConLoader();
};

//DEFINING SKYCONS FUNCTION 
runApp.skyConLoader = function(){
    let icons = new Skycons({ "color": "#134f6b" });
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

//USING GOOGLE AUTOCOMPLETE search bar function
runApp.initAutocomplete = (id) => {
    new google.maps.places.Autocomplete(document.getElementById(id));
}


//Function to check if UVIndex is over 4, if so prints to DOM
runApp.uvIndexChecker = (uv) => {
    if (uv >= 4) {
        $(".blurb").append("<em>*UV warning, wear some SPF*</em>");
        $(".weather").append(`<p>UV Index: ${uv}`);
        $(".longWeather").append(`<p>UV Index: ${uv}`);
    };
}

//function that checks temp and prints a string to the screen depending on returned temp. 
runApp.blurbCondition = (temperature, temperature2) => {
    //create array of arrays filled with strings so they are within scope of function
    const blurbArray = [
        [`It is pretty cold out there, bundle up and be sure to get those miles in`, `Well ${temperature}°C / ${temperature2}°F  isn't great, so get some layers on and get out there.`, `Ya, you're gonna need a coat but its worth it to hit those goals.`],
        [`Put on those fast shoes and hit cruisin' altitude. 🤙`, `Nice, ${temperature}°C / ${temperature2}°F. Great for a run!`, `Dug would love to run in this weather, do it for him.`],
        [`${temperature}°C / ${temperature2}°F can be tough on some people, but we believe in you.`, `It's pretty hot out there... make sure to bring some water.`, `Watch your hydration level out there and know your limits.`]
    ];
    //runs if else statement that takes temperature value and decides which array to grab from, randomizing the choice from within array.
    //finalBlurb is the blurb which will be printed
    let finalBlurb;
    if (temperature < 4) {
        finalBlurb = (blurbArray[0][Math.floor(Math.random() * blurbArray.length)]);
    } else if (temperature < 20) {
        finalBlurb = (blurbArray[1][Math.floor(Math.random() * blurbArray.length)]);
    } else {
        finalBlurb = (blurbArray[2][Math.floor(Math.random() * blurbArray.length)]);
    }
    //print blurb
    runApp.blurbPrinter(finalBlurb);
};

//function that prints finalblurb to the screen
runApp.blurbPrinter = (blurb) => {
    $(".blurb").empty();
    $(".blurb").append(`<p>${blurb}</p>`);
};

//function that prints location name to mainPage header
runApp.headingPrinter = (location) => {
    $("#locationHeading").html(`${location}`);
    //here is where we would put IF / ELSE statement when fetchCoordinates work// 
};

//function that shows and hides current weather and weather forecast
runApp.weatherDisplaySwitch = () => {
    $(".switch").on("click", function(e){
        $(".longWeather").toggleClass("open");
        $(".weather").toggleClass("close");
    });
};


//function that shows and hides about section popup // added the ablity to hide modal with "esc" key
runApp.aboutPopUp = () => {
    $(".openSwitch").on("click", function(e){
        e.preventDefault();
        $(".aboutContent").addClass("aboutContentOpen");
    })
    $(".closeSwitch").on("click", function (e) {
        e.preventDefault();
        $(".aboutContent").removeClass("aboutContentOpen");
    })
    $(document).keyup(function (e) {
        if (e.keyCode == 27) { // esc keycode
            $('.aboutContent').removeClass("aboutContentOpen");
        }
    });
}

// RUNNING FUNCTIONS - INIT
runApp.init = function () {
    runApp.listenForSubmit();
    runApp.initAutocomplete("location");
    runApp.aboutPopUp();
    runApp.weatherDisplaySwitch();
    runApp.smoothScroll();
    //see below not currently in use
    // runApp.fetchCoordinates();
}

// Document function ready. runApp init calling other functions
$(function () {
    runApp.init();
});


////////////////////////////////////////////////////////////////////////////

// //function that gets lat/lng from user <---------- NOT CURRENTLY IN USE 
// runApp.fetchCoordinates = function () {
//     navigator.geolocation.getCurrentPosition(function (position) {
//         locationReturn.lat = position.coords.latitude;
//         locationReturn.lng = position.coords.longitude;
//         runApp.weatherInfo(locationReturn.lat, locationReturn.lng);
//         console.log(locationReturn.lat, locationReturn.lng);
//     });
// };


