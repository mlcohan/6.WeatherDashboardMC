
$(document).ready(function() {




 

    $("#searchBtn").on("click", function(event) {
        event.preventDefault()

    
        searchValue = ""
    var searchValue = $("#searchInput").val();
        console.log(searchValue);

        if (searchValue === "") {
            return
        }
        else {
    //pull up past searches 
    var pastSearches = JSON.parse(localStorage.getItem("#pastSearch"));    
    $("#pastSearch").append("<ul>"+ pastSearches + "</ul>")

    console.log(pastSearches)
    
    //function to diplay history
    function displayHistory() {
    //Use local stoage to save weather search
     localStorage.setItem("#pastSearch", JSON.stringify(searchValue))
    }

    
        //display History
        displayHistory()
        getApi()
        }
      // clear input box
      $("#searchInput").val("")

    
    
    

//function to get data from the API used to get lat/lon
    function getApi () {

        var APIkey = "5a9bcc7ae1c44f294dec0c1395fed462";      
        var apiSearchCity = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + APIkey;
        


        fetch(apiSearchCity)
        .then(function (response) {
           return response.json()
        })
        .then(function (data){

            var latValue = data.city.coord.lat
            var lonValue = data.city.coord.lon
            var apiSearchLatLon = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latValue + "&lon=" + lonValue + "&appid=" + APIkey + "&units=imperial"
        

            console.log(data)

        
        //use lat lon to call second API
        
        fetch(apiSearchLatLon)
        .then(function (response) {
           return response.json()
        })
        .then(function (data2){
    
           
        
           //get date of searched city
           d = new Date()
           localTime = d.getTime()
           localOffset = d.getTimezoneOffset() * 60000
           utc = localTime + localOffset
           var searchCity = utc + (1000 * data.city.timezone)
           nd = (new Date(searchCity)).toLocaleDateString('en-US')


           //empty weather card and fill with input city 

            $("#weather").empty();
            resultCard = $("#searchResults").append("<div class='card' 'bg-light' 'text-dark' 'mb-3', 'p-3'></div>")
            cardBody = $("#weather").append('<div class="card body"></div>')
            $(cardBody).append('<h1 class = "card-title">' + data.city.name + '  (' + nd + ') <img src="http://openweathermap.org/img/wn/' + data2.current.weather[0].icon + '@2x.png" alt="Weather icon"></h2>'
            // $(cardBody).append('<img src="http://openweathermap.org/img/wn/' + data2.current.weather[0].icon + '@2x.png" alt="Weather icon">'
                                 +"<p class='card-text'> Temperature: "  + data2.current.temp + " °F <br/></p>"
                                 +"<p class='card-text'> Humidity: " + data2.current.humidity + " % <br/></p>"
                                 +"<p class='card-text'> Wind Speed: " + data2.current.wind_speed + " MPH </p>"
                                 +"<button type='button' class='btn' id='uviBtn'> UV Index: " + data2.current.uvi + " </button>")

                                 // change color depending on uv value
        if (data2.current.uvi < 3) {
            $("#uviBtn").addClass("btn-success")
        }
          else if (data2.current.uvi < 7) {
            $("#uviBtn").addClass("btn-warning");
          }
          else {
            $("#uviBtn").addClass("btn-danger");
          }
    
            

                // $("#searchResults").append(data)   
                console.log(data2)

        //five day forcast
        //  $("#fiveDay").append("<div class = 'col-3'><h1 class = 'card-title'> " + nd + " </h1></div>")   
         $("#fiveDay").append("<p class ='card-text>" + data2.current.wind_speed + "</p></div>")   

         
          })  
          
          
        })

      
    }

})

    



})