// Need Search bar
// Need on click function with .ajax inside of it
// need to pull information from weather API and display on screen.
var searchButton = $("#fname");

$("button").on("click", function () {
    event.preventDefault();
    var userChoice = searchButton.val();
    pullApi();
    console.log(userChoice);
    console.log(pullApi);

    // run function to pull API info. 
    function pullApi() {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userChoice + "i&appid=62fbd3039df5554b8330852eff63de44"
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // We store all of the retrieved data inside of an object called "response"
            .then(function (response) {
                // var results = response.response.docs
                console.log(response);
                // console.log(results[0].snippet);
                // for (var i = 0; i < results.length; i++)
                //     var firstSnippet = results[i].snippet;
                // $("#resultSnippet").append(firstSnippet);
            })
    }
})

// capture the user input by the id"fname"

