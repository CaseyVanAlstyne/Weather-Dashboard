var searchButton = $("#fname");

$("button").on("click", function () {
    event.preventDefault();
    var userChoice = searchButton.val();
    pullApiWeather(userChoice);
    pullApiForecast(userChoice);
    console.log(userChoice);
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
            console.log(response.coord)

            var weatherDiv = $("<div>");

            var p = $("<p>").text("Current Temperature: " + searchTemp);
            var p1 = $("<p>").text("It currently feels like: " + searchFeelsLike);
            var p2 = $("<p>").text("The minimum temperature is " + searchTempMin);
            var p3 = $("<p>").text("The maximum temperature is " + searchTempMax);
            var p4 = $("<p>").text("The pressure outside is " + searchPressure);
            var p5 = $("<p>").text("The humidity level is too damn high; see: " + searchHumidity);
            var p6 = $("<p>").text("This is where you currently are. I need to access this information in another function/api call, but can't figure it out. " + JSON.stringify(searchLonLat));

            weatherDiv.append(p, p1, p2, p3, p4, p5, p6);

            $("#resultSnippet").prepend(weatherDiv);
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
