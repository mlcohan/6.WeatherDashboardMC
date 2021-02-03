
$(document).ready(function() {

    // var searchValue = $("#searchInput").val();
  

    $("#searchBtn").on("click", function(event) {
        event.preventDefault()

        var searchValue = $("#searchInput").val();
        console.log(searchValue);

        //function to get data from API
        if (searchValue === "") {
            return
        }
        else {
        getApi()
        }
      // clear input box
      $("#searchInput").val("");
    


    function getApi () {

        var APIkey = "5a9bcc7ae1c44f294dec0c1395fed462";
        // var requestUrl =  "http://api.openweathermap.org";

        var apiSearchCity = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + APIkey;
        

        fetch(apiSearchCity)
        .then(function (response) {
           return response.json()
        })
        .then(function (data){
            // $("#searchResults").text(JSON.stringify(data))
            $("#searchResults").append("<h2>" + "Weather Details of...." + data.city.name + "</h2>")
            $("#searchResults").append("<h2>" + data.list[0].weather[0].main + "</h2>") 
            $("#searchResults").append("<h2>" + data.list[0].weather[0].description + "</h2>") 

            //weather icon
            var iconcode = data.list[0].weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $('#wicon').attr('src', iconurl);
            

            //get date???
            var d = new Date();
            var n = d.getDate();

            $("#searchResults").append("<h2>" + n + "</h2>") 

                // $("#searchResults").append(data)   //not doing anything...
                console.log(data)

        


            //     for (var i=0; i<data.length; i++) {
              
            // cityName = data[i].city.name
           
            // console.log(cityName)
    
            // } 

          })  
          
          
        

        //ASK ABOUT JSON
            // var fiveDayForcast = getForecast(searchValue))
    }


})

    



})