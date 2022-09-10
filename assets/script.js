var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var todaysCityName = document.querySelector("#city-and-date");
var iconEl = document.querySelector(".icon");
var futureForecastContainer = document.querySelector(".future-forecast-container");


var apiKey = "8fa763faa40c3ad06afec6d0f80623e3";
var apiKey2 = "456382b69ba78bc0d18ae825d9b6baff";


function saveRecentSearch(city) {

    var list = JSON.parse(localStorage.getItem("cities")) || [];

    // TODO: check if this is an array
    // What if the city is empty
    list.push(city);

    localStorage.setItem("cities", JSON.stringify(list))
}

function loadRecentCities() {
    var cities = JSON.parse(localStorage.getItem("cities"));


    console.log("Cities: ", cities);

    // TODO: Display the list as buttons under recent search

}

loadRecentCities();


var formSubmit = function(event) {
    event.preventDefault();    

    var city = cityInputEl.value.trim();

    saveRecentSearch(city);

    if (city) {
        getCityWeather(city);
        getCityForecast(city);
        console.log(getCityForecast)
        cityInputEl.value = "";
    }
    else {
        alert("Please enter a city name")
    }
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
    futureForecastContainer.innerHTML = "";

    todaysCityName.textContent = searchCity.toUpperCase();
    var dailyList = data.list;
    console.log(dailyList);
    // var iconsOnScreen = [];
    // console.log(iconsOnScreen)

    for (var i = 6; i < dailyList.length; i = i+8) {
        var dailyWeather = dailyList[i];
   
    // console.log(dailyList[i]);
    // iconsOnScreen.push(icon);
    createForecastCards(dailyWeather);

    }
    
    
    

    

}

var createForecastCards = function (daily) {

    var {icon} = daily.weather[0];
    var {temp} = daily.main;
    console.log(temp)
    console.log(icon);
    console.log("Daily: ", daily);
    var iconOut = document.createElement("div");
    iconOut.innerHTML = "<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png' />";
    iconOut.classList = "class='future-icon-container'"
    
    var tempOut = document.createElement("span");
    tempOut.innerHTML = "Temperature: " + temp;
    console.log(tempOut)




    var futureCardDiv = document.createElement("div");
    futureCardDiv.classList = "col mb-3 future-card-div"
    futureCardDiv.appendChild(iconOut);
    futureCardDiv.appendChild(tempOut);
    futureForecastContainer.appendChild(futureCardDiv)
}










cityFormEl.addEventListener("submit", formSubmit);


// Current weather for a certain city
//https://api.openweathermap.org/data/2.5/weather?q=london&appid=8fa763faa40c3ad06afec6d0f80623e3

//  5 day forecast city + 5 days imperial (US system)
//https://api.openweathermap.org/data/2.5/forecast?q=London&appid=456382b69ba78bc0d18ae825d9b6baff&units=imperial


//daily weather using lat and lon
//https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,current,minutely,alerts&appid=456382b69ba78bc0d18ae825d9b6baff

//geocoding for a city
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=8fa763faa40c3ad06afec6d0f80623e3