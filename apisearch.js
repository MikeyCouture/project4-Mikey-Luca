
// ---------------------------------
// DARK SKY API - WORKS!


// const testApp = {};
// testApp.apiKey = `12db71466624332600c66c1d7e474f6d`;

// testApp.getInfo = function () {
//     $.ajax({
//         url: `https://api.darksky.net/forecast/${testApp.apiKey}/43.6532,79.3832`,
//         method: "GET",
//         dataType: "JSONP"
//     }).then((res) => {
//         // we are passing off the art results to another method here!
//         // this is where the method is CALLED
//         // console.log(res);
//         testApp.currentWeather(res.currently);
//         // artApp.displayResults(res.artObjects);
//     });
// };

// testApp.getInfo();
// // console.log(testApp.getInfo);



// testApp.currentWeather = function(curr){
//     console.log(curr);
//     for (let elem in curr){
//         console.log(elem, curr[elem]);
//         $(".weatherInTheSix").append(`<p>${elem}: ${curr[elem]}</p>`);
//     }
    
// }




// ---------------------------------
// GOOGLE API


const testApp = {};
testApp.apiKey = `AIzaSyBXaDLbvS9m_4euOEdcVxbnybx8D7202C4`;
let userlocation;

testApp.geocode = function () {
    // let location = "Hanoi"
    $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBXaDLbvS9m_4euOEdcVxbnybx8D7202C4`,
        method: "GET",
        dataType: "JSON",
        data: {
            address: `${userlocation}`
        }
    }).then((res) => {
        console.log(res);
        console.log(res.results[0].geometry.location);
        let geoLocation = res.results[0].geometry.location;
        
    });
};


$("form").on("submit", function(e){
    e.preventDefault();
    let userlocation = $("#location").val();
    console.log(userlocation);
    testApp.geocode();
});





// console.log(testApp.getInfo);



// testApp.currentWeather = function(curr){
//     console.log(curr);
//     for (let elem in curr){
//         console.log(elem, curr[elem]);
//         $(".weatherInTheSix").append(`<p>${elem}: ${curr[elem]}</p>`);
//     }

// }




