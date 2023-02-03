// DOM variables
var flightsEl = document.getElementById('flights-container');

// Function to retrieve data on the next 5 upcoming launches
function getLaunched() {
    var requestURL = 'https://fdo.rocketlaunch.live/json/launches/next/5';

    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            var data = data.result;
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                //Create a list element
                var listItem = document.createElement('li');
        
                //Set the text of the list element to the JSON response property
                listItem.textContent = data[i].date_str + ' - ' + data[i].name
        
                //Append the li element to the id associated with the ul element.
                flightsEl.appendChild(listItem);
              }
        })
}

getLaunched();