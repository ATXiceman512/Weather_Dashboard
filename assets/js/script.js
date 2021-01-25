var cityButtonEl = document.querySelector("#city-buttons");
var cityFormButton = document.querySelector("#city-form");
var cityName = document.querySelector("#city");
var weatherHeader = document.getElementById("weather-header-info");
var weatherForcast = document.getElementById("weather-header-forcast");
var weatherDetails = document.querySelector("#weather-details");
var history = document.querySelector("#recent-search");
var appId = "appid=405923b58d900672fd4f4879eac1f822";

var formSubmitHandler = function (event) {
    event.preventDefault();
    var city = cityName.value;

    if (city) {
        getCurrentWeatherInformation(city);
        console.log("City selected: " + city);
        cityName.value = "";

    } else {
        alert("Please Enter a City Name");
    }
}

var buttonClickHandler = function (event) {
    var city = event.target.getAttribute("city");

    if (city) {
        getCurrentWeatherInformation(city);
        console.log("City selected: " + city);
    }
}

var getCurrentWeatherInformation = function (city) {
    // ex. https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&" + appId;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                weatherHeader.textContent = "Current Weather Information For: " + data.name + ", " + data.sys.country;
                weatherForcast.textContent =  data.name + ", " + data.sys.country + " - (5) Day Forecast";
                displayCurrentWeatherInformation(data);
            })
        }
    })
}

// ex.            http://api.openweathermap.org/data/2.5/uvi?lat=41.85&lon=-87.65&appid=405923b58d900672fd4f4879eac1f822
var getUvIndex = function (lat, lon) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&" + appId;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                document.getElementById("weather-field-uv-index").innerHTML = "<b>UV Index: </b>" + data.value;
            })
        }
    })
}


var displayCurrentWeatherInformation = function (data) {

    var today = getTodaysDate(data.dt);

    document.getElementById("weather-field-city-time").innerHTML = "<b>" + data.name + ", " + data.sys.country + "</b> (" + today + ")";
    var temp = convertTemp(data.main.temp);
    document.getElementById("weather-field-temperature").innerHTML = "<b>Temperature: </b>" + temp + " &#x2109";
    document.getElementById("weather-field-humidity").innerHTML = "<b>Humidity: </b>" + data.main.humidity + "%";
    var mphSpeed = data.wind.speed * 2.24;
    document.getElementById("weather-field-wind-speed").innerHTML = "<b>Wind Speed: </b>" + mphSpeed.toFixed(2) + " MPH";

    // Calls the UV index function to pass Lat and Long to retrieve value
    var uvIndex = getUvIndex(data.coord.lat, data.coord.lon);

    for (i = 0; i < data.length; i++) {
        info = data;
        var fTemp = convertTemp(info.main.temp);
        console.log(info.dt_txt, "Temp: " + fTemp);
    }
}


var addToSearchHistory = function (city, state) {
    // CREATE THE LINE ITEM
    // NEED HELP WITH THIS!!!!!!!!!
    var ul = document.getElementById("#recent-search");
    var li = document.createElement("li");
    li.textContent = "TEST";
    ul.appendChild(li);
}

// Used to convert temperature from K to F
var convertTemp = function (temp) {
    temp = parseFloat(temp);
    var fTemp = ((temp - 273.15) * 1.8) + 32;
    // Rounding temperature before returning the value
    fTemp = fTemp.toFixed(1);
    return fTemp;
}


var getTodaysDate = function (unix) {
    //NEED TO FIX TO HAVE DATE AND TIME UPDATE CORRECTLY

    var d = new Date(unix * 1000),	// Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }

    // ie: 2013-02-18, 8:35 AM	
    // time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm + " UTC";
    time = mm + '-' + dd + '-' + yyyy + ', ' + h + ':' + min + ' ' + ampm + " UTC";

    return time;
}

cityButtonEl.addEventListener("click", buttonClickHandler);
cityFormButton.addEventListener("submit", formSubmitHandler);

