var searchButton = $("#fname");

$("#mainSearchButton").on("click", function () {
    event.preventDefault();
    var userChoice = searchButton.val().trim();
    pullApiWeather(userChoice);
    pullApiForecast(userChoice);
    console.log(userChoice);
    renderPreviousSearch(userChoice);
    // console.log(pullApi);
})

// run function to pull API info for current weather data. 
function pullApiWeather(userChoice) {
    // empty the prepended data
    $("#resultSnippet").empty();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userChoice + "&appid=62fbd3039df5554b8330852eff63de44";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log("current stuff", response);
            var searchName = response.name;
            // console.log(searchName);
            var searchTemp = response.main.temp;
            // console.log(searchTemp);
            var searchFeelsLike = response.main.feels_like;
            var searchTempMin = response.main.temp_min;
            var searchTempMax = response.main.temp_max;
            var searchPressure = response.main.pressure;
            var searchHumidity = response.main.humidity;
            var searchLonLat = response.coord;
            pullApiUV(searchLonLat);
            // console.log(response.coord)
            var weatherDiv = $("<div>");
            var mainContainer = $("<div>").addClass("jumbotron")
            var p0 = $("<div>").addClass("card").text("This is what you searched for: " + searchName);
            var p = $("<div>").addClass("card").text("Current Temperature: " + searchTemp);
            var p1 = $("<div>").addClass("card").text("It currently feels like: " + searchFeelsLike);
            var p2 = $("<div>").addClass("card").text("The minimum temperature is " + searchTempMin);
            var p3 = $("<div>").addClass("card").text("The maximum temperature is " + searchTempMax);
            var p4 = $("<div>").addClass("card").text("The humidity level is " + searchHumidity);
            var p5 = $("<div>").addClass("card").text("This is where you currently are. I need to access this information in another function/api call, but can't figure it out. " + JSON.stringify(searchLonLat));
            mainContainer.append(p0, p, p1, p2, p3, p4, p5);
            weatherDiv.append(mainContainer);
            $("#resultWeatherSnippet").prepend(weatherDiv);
        })
}

// run function to pull API info for 5 day/3 hour forecast. 
function pullApiForecast(userChoice) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userChoice + "&appid=62fbd3039df5554b8330852eff63de44";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            // console.log("five day", response);
            // console.log(response.list[7].dt_txt);
            // console.log(response.list[15].dt_txt);
            // console.log(response.list[23].dt_txt);
            // console.log(response.list[31].dt_txt);
            // console.log(response.list[39].dt_txt);
            for (var i = 7; i < response.list.length; i += 8) {
                console.log(i, response.list[i]);
                response.list[i];
            }
            var weatherDiv = $("<div>");
            var mainContainer = $("<div>").addClass("jumbotron")
            var day1 = $("<div>").addClass("card").text("Here is the weather icon: " + response.list[7].weather[0].icon);
            var day2 = $("<div>").addClass("card").text("The average temperature for day 2 is: " + response.list[15].main.temp);
            var day3 = $("<div>").addClass("card").text("The wind speed for day 3 is: " + response.list[23].wind.speed);
            var day4 = $("<div>").addClass("card").text("Temps feels like: " + response.list[31].main.feels_like);
            var day5 = $("<div>").addClass("card").text("Max temp for day 5: " + response.list[39].main.temp_max);
            mainContainer.append(day1, day2, day3, day4, day5);
            weatherDiv.append(mainContainer);
            $("#resultForecastSnippet").prepend(weatherDiv);
        })
}

// run function to pull API info for UV Index. 
function pullApiUV(lonLat) {
    var lat = lonLat.lat;
    var lon = lonLat.lon;
    var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=62fbd3039df5554b8330852eff63de44&lat=" + lat + "&lon=" + lon;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
        })
}

function renderPreviousSearch(userChoice) {
    // add in a prevent empty submission field, so that an empty button is not created on click of an empty form. 
    $("#resultSnippet").empty();
    var previousSearchButton = $("<button>").text(userChoice);
    $("#repeatButton").prepend(previousSearchButton);
    // pullApiWeather(userChoice);
    // Create onclick for #repeatButton that will run the pullApiWeather(userChoice) ************************* Expect this not to work
}
