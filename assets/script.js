var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var todaysCityName = document.querySelector("#city-and-date");
var iconEl = document.querySelector(".icon");

var apiKey = "8fa763faa40c3ad06afec6d0f80623e3";


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
    console.log(event);
};



var getCityWeather = function(cityName) {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    fetch(weatherUrl).then(function(response){
        response.json().then(function(data){
           displayCityWeather(data, cityName); 
        })
    }) ;
  
    
var displayCityWeather = function(weather, searchInput) {
    //clear old content
    todaysCityName.textContent = searchInput;
    

    console.log(weather);
    console.log(searchInput);

}
    
};

cityFormEl.addEventListener("submit", formSubmit);

//https://api.openweathermap.org/data/2.5/weather?q=london&appid=8fa763faa40c3ad06afec6d0f80623e3

// https://api.openweathermap.org/data/2.5/onecall?q=london&appid=8fa763faa40c3ad06afec6d0f80623e3

//  5c347a272d163937e56a00211b0e0c68