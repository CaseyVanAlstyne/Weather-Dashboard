var searchButton = $("#fname");

$("button").on("click", function () {
    event.preventDefault();
    var userChoice = searchButton.val();
    pullApiWeather(userChoice);
    pullApiForecast(userChoice);
    pullApiUV();
    console.log(userChoice);
    // console.log(pullApi);
})

// run function to pull API info for current weather data. 
function pullApiWeather(userChoice) {
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
            console.log(response.coord)
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
function pullApiUV() {
    var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
        })
}
