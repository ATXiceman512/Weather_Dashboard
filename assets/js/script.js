var cityButtonEl = document.querySelector("#city-buttons");
var cityFormButton = document.querySelector("#city-form");
var cityName = document.querySelector("#city");

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityName.value;

    if(city){
        console.log(city);
        cityName.value = "";

    } else{
        alert("Please Enter a City Name");
    }  
}

var buttonClickHandler = function(event) {
    var city = event.target.getAttribute("city");

    if(city){
        console.log(city);
    }
}

cityButtonEl.addEventListener("click", buttonClickHandler);
cityFormButton.addEventListener("submit", formSubmitHandler);

