$(document).ready(function() {

  //pull up past searches 
  var pastSearch = JSON.parse(localStorage.getItem("history")) || [];


  //clicking search button
    $("#searchBtn").on("click", function(event) {
        event.preventDefault()
        
    var searchValue = $("#searchInput").val();
    if (!pastSearch.includes(searchValue.toLowerCase())){
      pastSearch.push(searchValue.toLowerCase())
    }
     //get rid of error message if nothing in search
     if (searchValue === "") {
        return
    }
    else {
      //Use local storage to save weather search
      localStorage.setItem("history", JSON.stringify(pastSearch))
      displayStorage();
      console.log(localStorage)
    //need a way to differentiate new rows with appended buttons for loop?
  //   for (var i = 0; i < pastSearch.length; i++){
  //   var button = $("<button class = 'btn btn-primary'></button")
  //   button.text(pastSearch[i])
  //   button.click(function(){
  //     var city =    $(this).text()
  //     getApi(city)
  //   })
  //   var searchRow = $("<div></div>") 
  //   searchRow.addClass("row")
  //   searchRow.attr("id", "searchRow")
  //   $("#pastSearch").append(searchRow)
  //   $("#searchRow").append(button)
  //   $("#searchRow").removeAttr("id")
  // }
        
      // clear input box
      $("#searchInput").val("")
        }
    
    
        getApi(searchValue)

})

//function to get data from the API used to get lat/lon
function getApi (searchValue) {
  var APIkey = "5a9bcc7ae1c44f294dec0c1395fed462";      
  var apiSearchCity = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + APIkey;
  
  fetch(apiSearchCity)
  .then(function (response) {
     return response.json()
  })
  .then(function (data){

      var latValue = data.city.coord.lat
      var lonValue = data.city.coord.lon
      var apiSearchLatLon = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latValue + "&lon=" + lonValue + "&appid=" + APIkey + "&units=imperial"

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
      // var resultCard = $("#searchResults").append("<div class='card' 'bg-light' 'text-dark' 'mb-3', 'p-3'></div>")
      var cardBody = $("#weather").append('<div class="card body"></div>')
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


      $("#fiveDay").empty()
      $("#fiveDay").append("<h4 class = 'col-12'>Five Day Forecast</h4>")
  
    //five day forecast
    for (var i=1; i<6; i++){
        var temperature = data2.daily[i].temp.day
        var humidity = data2.daily[i].humidity
        var icon = data2.daily[i].weather[0].icon
        var date = (new Date(data2.daily[i].dt*1000)).toLocaleDateString('en-US')

        console.log(date)

      var fiveDayCard = $("<div class = 'col-2'></div>")
      

        $(fiveDayCard).append( "<p class='card-text'> " + date + " </p>"
                              +"<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png' class= 'date' alt='Weather icon'>"           
                              +"<p class='card-text'> Temperature: "  + temperature + " °F <br/></p>"
                             +"<p class='card-text'> Humidity: " + humidity + " % <br/></p>")
      
          $("#fiveDay").append(fiveDayCard)
    }


   
    })  
    
    
  })


}



//display old searches when refreshed
function displayStorage(){
  //pull up past searches 

  $("#pastSearch").empty()
  for (var i=0; i < pastSearch.length; i++){ 

  var button = $("<button class = 'btn btn-primary'></button")
  button.text(pastSearch[i])
  button.click(function(){
  var city =  $(this).text()
  getApi(city)
  })
  var searchRow = $("<div></div>") 
  searchRow.addClass("row")
  searchRow.attr("id", "searchRow")
  $("#pastSearch").append(searchRow)
  $("#searchRow").append(button)
  $("#searchRow").removeAttr("id")

  console.log(pastSearch)
  

    // clear input box
    $("#searchInput").val("")
  }
}
//call old searches
displayStorage();
})
//create a new local storage variable that holds an array/object of ALL past searches 
//possibily button appending in a for loop, go through the array to append
//make appended buttons work (on button create, set button value as city name, and plug it in the ) Look at fridge examples attr.("value", cityName) <-- variable 
//

