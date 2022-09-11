var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var todaysCityName = document.querySelector("#city-and-date");
var iconEl = document.querySelector(".icon");
var futureForecastContainer = document.querySelector(".future-forecast-container");
var recentInquiresUl = document.querySelector("recent-inquires-ul");


var apiKey = "8fa763faa40c3ad06afec6d0f80623e3";
var apiKey2 = "456382b69ba78bc0d18ae825d9b6baff";


function saveRecentSearch(city) {

    var list = JSON.parse(localStorage.getItem("cities")) || [];

    list.push(city);


    localStorage.setItem("cities", JSON.stringify(list))
}

function loadRecentCities() {
    var cities = JSON.parse(localStorage.getItem("cities"));

    console.log("Cities: ", cities);
    // for (i = 0; i < cities.length; i++) {
    //     var searchHistory = document.createElement("li");
    //     searchHistory.innerHTML = cities[i];
    //     recentInquiresUl.appendChild(searchHistory)
        

    // }


}

loadRecentCities();


var formSubmit = function(event) {
    event.preventDefault();   
    
    var city = cityInputEl.value.trim();

    saveRecentSearch(city);

    // saveRecentSearch(city);

    if (city) {
        getWeather(city);
        
        console.log(city)
        cityInputEl.value = "";
    }
    else {
        alert("Please enter a city name")
    }
};
            

                  

var getWeather = function(cityName) {

    var latAndlonUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey;

    fetch(latAndlonUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            var {lat} = data[0];
            var {lon} = data[0];
            var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" +  lon +  "&exclude=hourly,current,minutely,alerts&appid=" + apiKey2 + "&units=imperial";

            fetch(forecastUrl).then(function(response) {
                response.json().then(function(data) {
                    console.log(data);
                    displayCityWeather(data, cityName);
                    displayCityForecast(data)
                });
            });  
        });
    });
};


var displayCityWeather = function(data, searchInput) {
    //clear old content
    console.log(data);
    todaysCityName.textContent = searchInput.toUpperCase();
    var {icon} = data.daily[0].weather[0];
    var {day} = data.daily[0].temp;
    var {humidity} = data.daily[0];
    var {wind_speed} = data.daily[0];
    var {uvi} = data.daily[0];
    
    document.querySelector("#icon-sourse").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".temp").innerText = "Temp: " + Math.round(day) + "°F";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind-speed").innerText = "Wind speed: " + Math.round(wind_speed) + " mph";
    document.querySelector(".uv-index").innerText = "UV Index: " + uvi;
};

var displayCityForecast = function(data) {
    futureForecastContainer.innerHTML = "";
    var dailyList = data.daily;
    
    for (var i = 1; i <= 5; i++) {
        var dailyWeather = dailyList[i];
        createForecastCards(dailyWeather);
    }   
} 

var createForecastCards = function (daily) {

    var {icon} = daily.weather[0];
    var {day} = daily.temp;
    var {wind_speed} = daily;
    var {humidity} = daily;

    var iconOut = document.createElement("div");
    iconOut.innerHTML = "<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png' />";
    iconOut.classList = "class='future-icon-container'";
    
    var tempOut = document.createElement("span");
    tempOut.innerHTML = "Temp: " + Math.round(day) + "°F";

    var speedOut = document.createElement("span");
    speedOut.innerHTML = "Wind Speed: " + Math.round(wind_speed) + " mph";

    var humidityOut = document.createElement("span");
    humidityOut.innerHTML = "Humidity: " + humidity + "%"; 

    var futureCardDiv = document.createElement("div");
    futureCardDiv.classList = "col mb-3 future-card-div"
    futureCardDiv.appendChild(iconOut);
    futureCardDiv.appendChild(tempOut);
    futureCardDiv.appendChild(speedOut);
    futureCardDiv.appendChild(humidityOut);
    futureForecastContainer.appendChild(futureCardDiv)
}


cityFormEl.addEventListener("submit", formSubmit);


//daily weather using lat and lon
//https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,current,minutely,alerts&appid=456382b69ba78bc0d18ae825d9b6baff

//geocoding for a city
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=8fa763faa40c3ad06afec6d0f80623e3