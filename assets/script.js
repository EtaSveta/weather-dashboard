var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var todaysCityName = document.querySelector("#city-and-date");
var iconEl = document.querySelector(".icon");
var futureCardEl = document.querySelector(".future-card");

var apiKey = "8fa763faa40c3ad06afec6d0f80623e3";
var apiKey2 = "456382b69ba78bc0d18ae825d9b6baff";



var formSubmit = function(event) {
    var city = cityInputEl.value.trim();

    if (city) {
        getCityWeather(city);
        getCityForecast(city);
        console.log(getCityForecast)
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

var displayCityWeather = function(data, searchInput) {
    //clear old content
    console.log(data);
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
    
var getCityForecast = function (cityForecast) {
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityForecast + "&appid=456382b69ba78bc0d18ae825d9b6baff&units=imperial";
    fetch(forecastUrl).then(function(response) {
    response.json().then(function(data){
        displayCityForecast(data, cityForecast)
        console.log(data);
    })

})

};

var displayCityForecast = function(data, searchCity) {
    todaysCityName.textContent = searchCity;
    var dailyList = data.list;
    console.log(dailyList)
    for (var i = 6; i < dailyList.length; i = i+8) {
    var {icon} = dailyList[i].weather[0];
    console.log(icon)
    
    var iconOnScreen = document.createElement("div");
    iconOnScreen.innerHTML = "<div class='future-icon-container'><img src='http://openweathermap.org/img/wn/" + icon + "@2x.png' />";
    futureCardEl.appendChild(iconOnScreen);

    }

}











cityFormEl.addEventListener("submit", formSubmit);


// Current weather for a certain city
//https://api.openweathermap.org/data/2.5/weather?q=london&appid=8fa763faa40c3ad06afec6d0f80623e3

//  5 day forecast city + 5 days imperial (US system)
//https://api.openweathermap.org/data/2.5/forecast?q=London&appid=456382b69ba78bc0d18ae825d9b6baff&units=imperial