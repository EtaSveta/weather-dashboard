var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var todaysCityName = document.querySelector("#city-and-date");
var iconEl = document.querySelector(".icon");

var apiKey = "8fa763faa40c3ad06afec6d0f80623e3";
var apiKey2 = "456382b69ba78bc0d18ae825d9b6baff";


var formSubmit = function(event) {
    var city = cityInputEl.value.trim();

    if (city) {
        getCityWeather(city);
        cityInputEl = "";
    }
    else {
        alert("Please enter a city name")
    }
    event.preventDefault();    
};



var getCityWeather = function(cityName) {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
    fetch(weatherUrl).then(function(response){
        response.json().then(function(data){
           displayCityWeather(data, cityName); 
        })
    }) ;
};  

// var getCityForecast = function(city) {
//     var forecastUrl = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey2 + "&units=imperial";
//     console.log(forecastUrl);
//     // fetch(forecastUrl).then(function(response){
//     //     response.json().then(function(data) {
//     //         console.log(data);
//     //     })
//     // })

// }

var displayCityWeather = function(data, searchInput) {
    //clear old content
    todaysCityName.textContent = searchInput.toUpperCase();
    var {icon} = data.weather[0];
    var {temp} = data.main;
    var {humidity} = data.main;
    var {speed} = data.wind;
    // var UV index goes here!
    

    document.querySelector("#icon-sourse").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".temp").innerText = temp;
    document.querySelector(".humidity").innerText = humidity + "%";
    document.querySelector(".wind-speed").innerText = speed + " mph";
    // UV index goes here!

};
    


cityFormEl.addEventListener("submit", formSubmit);


// Current weather for a certain city
//https://api.openweathermap.org/data/2.5/weather?q=london&appid=8fa763faa40c3ad06afec6d0f80623e3

//  5 day forecast city + 5 days imperial (US system)
//api.openweathermap.org/data/2.5/forecast?q=London&appid=456382b69ba78bc0d18ae825d9b6baff&units=imperial