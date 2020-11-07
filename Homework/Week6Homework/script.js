$("#currentDay").text("Today is: " + moment().format("dddd, MMMM Do"));

$("#currentTime").text("Time: " + moment().format("h:mm:ss a"));



$("#button-addon2").click(function(event){
    //preventing the on click default
    event.preventDefault();
    
    //Creating Variable for our function
    var userGet = $("#userInput").val().trim();
    
    //functions running
    showCity(userGet);
    getWeatherData(userGet);
    saveLocalStorage();
    producePastCities();
});

$("#pastCities").on("click", ".citiesButton", function(event){
    //preventing the on click default
    event.preventDefault();
    // functions running
    showCity($(this).text());
    getWeatherData($(this).text());
})

//Function calling api data
function getWeatherData(cityname) {
    //Function building our initial URL
    function buildQueryURL() {
        var userCity = cityname;
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=abfea0d65bd360c07d899ae93cc7ab26";
        return queryURL;
    };
    var queryURL = buildQueryURL();
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //Setting Variables for our Today's Weather div
        var resToday = response.main
        var temp = "Temp: " + resToday.temp;
        var humid = "Humidity: " + resToday.humidity;
        var todayDate = response.dt
        var todayDateConvert = timeConverter(todayDate)
        var windspeed = "Windspeed: " + response.wind.speed;

        // Function used to convert time the api gave to user readable
        function timeConverter(x){
            var a = new Date(x * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var time = date + ' ' + month + ' ' + year;
            return time;
        }

        //Adding the Today Weather to our html
        $(".clear").empty();
        $("#todayDate").append(todayDateConvert);
        $("#cityTemp").append(temp);
        $("#cityHumid").append(humid);
        $("#cityWind").append(windspeed);
        
        //Verifying with our response on what type of icon to use
        var iconResponse = response.weather[0].main
        $("#todayIcon").removeClass("invis")
        if(iconResponse == "Clear"){
            $("#todayIcon").attr("src", "http://openweathermap.org/img/wn/01d.png")
        } else if(iconResponse == "Clouds"){
            $("#todayIcon").attr("src", "http://openweathermap.org/img/wn/02d.png")
        } else if(iconResponse == "Rain"){
            $("#todayIcon").attr("src", "http://openweathermap.org/img/wn/10d.png")
        } else if(iconResponse == "Thunderstorm"){
            $("#todayIcon").attr("src", "http://openweathermap.org/img/wn/11d.png")
        } else if(iconResponse == "Snow"){
            $("#todayIcon").attr("src", "http://openweathermap.org/img/wn/13d.png")
        } else if(iconResponse == "Mist") {
            $("#todayIcon").attr("src", "http://openweathermap.org/img/wn/50d.png")
        } else {
            $("#todayIcon").addClass("invis")
        }
        
        //Setting coords to the user inputed value(city) for our forecast call
        var lon = response.coord.lon
        var lat = response.coord.lat
        var oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=abfea0d65bd360c07d899ae93cc7ab26";
        
        //Next call for our UV
        $.ajax({
            url: oneCall,
            method: "GET"
        }).then(function(response) {
            //Setting our UV Index for the Today's Weather(currently need lat and lon to get UV, not just city)
            var uvIndex = response.current.uvi
            var uvIndexText = "UV Index: " + response.current.uvi;
            $("#uvIndex").empty()
            $("#uvIndex").append(uvIndexText);
            if(parseInt(uvIndex) < 2) {
                $("#uvIndex").removeClass()
                $("#uvIndex").addClass("favorable")
            } else if (parseInt(uvIndex) < 7 && parseInt(uvIndex) > 2) {
                $("#uvIndex").removeClass()
                $("#uvIndex").addClass("moderate")
            } else {
                $("#uvIndex").removeClass()
                $("#uvIndex").addClass("severe")
            }
        });
        
        //Next call for our Forecast
        $.ajax({
            url: oneCall,
            method: "GET"
        }).then(function(response) {
            $("#weatherCards").empty();
            for(var i = 1; i< 6; i++ ) {
                //Setting Variables for the icon function as well as the date converter function
                var weather = response.daily[i].weather[0].main; 
                var date = response.daily[i].dt;
                
                //Creating divs to place for 5-day forecast
                var div = $("<div class='card text-white dayCards bg-primary mb-3' style='max-width: 18rem;'>")
                var headDate = $("<div class='card-header'>").text(timeConverter(date));
                var divBody = $("<div class='card-body'>");
                var titleTemp = $("<h5 class='card-title'>").text("Temp: " + response.daily[i].temp.day);
                var pHumid = $("<p class='card-text'>").text("Humid: " + response.daily[i].humidity);
                var spanTemp = $("<span>")

                //Function creating the icons for the forecast
                if (weather === "Rain") {
                    var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                } else if (weather === "Clouds") {
                    var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                } 
                 else if (weather === "Clear") {
                    var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                }
                 else if (weather === "Drizzle") {
                    var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                }
                 else if (weather === "Snow") {
                    var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                }

                //Appending divs accoording to the bootstrap card styling then appending it to the html
                div.append(headDate);
                div.append(divBody);
                divBody.append(titleTemp);
                divBody.append(pHumid);
                titleTemp.append(spanTemp);
                spanTemp.append(icon)
                $("#weatherCards").append(div);
            }
        });
    });
};
//Function clearing search bar
function clearTextArea() {
    $("#userInput").val("");
};
//Function saving user inputed cities to the loocal storage
function saveLocalStorage(){
    var userCity = $("#userInput").val();
    var userCities = [JSON.parse(localStorage.getItem("userCities"))]
    userCities.push(userCity);
    if (userCities.length > 10){
        userCities.shift();
    };
    localStorage.setItem('userCities', JSON.stringify(userCities));
    clearTextArea();
};
//function displaying user inputed city in h2
function showCity(cityname){
    var cityHead = "Today's Weather in " + cityname;
    $("h2").empty();
    $("h2").text(cityHead);
};
//Function addding a list of past cities the user has inputed
function producePastCities(){
    var userSearched = JSON.parse(localStorage.getItem("userCities"));
        for (var i = 1; i < userSearched.length; i++){
            var a = $("<button>")
            a.addClass("citiesButton badge badge-light");
            $(a).attr('id', 'pastCity');
            a.attr("data-name", userSearched[i]);
            a.text(userSearched[i]);
            $("#pastCities").prepend(a);
        };
};



