


var apiKey = "8fa763faa40c3ad06afec6d0f80623e3";
var apiKey2 = "456382b69ba78bc0d18ae825d9b6baff";




var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" +  lon +  "&exclude=hourly,current,minutely,alerts&appid=456382b69ba78bc0d18ae825d9b6baff";

            fetch(forecastUrl).then(function(response) {
                response.json().then(function(data) {
                    console.log(data);
                });
            });  

                  

var getLatAndLon = function(cityName) {

    var latAndlonUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=8fa763faa40c3ad06afec6d0f80623e3";

    fetch(latAndlonUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            var {lat} = data[0];
            var {lon} = data[0];
            console.log(lon);

                  

        });
    });


};

getLatAndLon("denver");




//daily weather using lat and lon
//https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,current,minutely,alerts&appid=456382b69ba78bc0d18ae825d9b6baff

//geocoding for a city
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=8fa763faa40c3ad06afec6d0f80623e3