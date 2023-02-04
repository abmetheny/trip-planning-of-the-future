// DOM variables
var flightsEl = document.getElementById('flights');
var destinationsEl = document.getElementById('destinations');

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
                var flightsListItem = document.createElement('input');
                var flightsListLabel = document.createElement('label');
                var br = document.createElement('br');

                flightsListItem.setAttribute('type', 'radio');
                flightsListItem.setAttribute('name', 'flight');
        
                //Set the text of the list element to the JSON response property
                flightsListLabel.innerHTML = data[i].date_str + ' - ' + data[i].name + ', ' + data[i].pad.location.name;
                flightsListLabel.setAttribute('for', data[i].name);

                // flightsListItem.textContent = data[i].date_str + ' - ' + data[i].name + ', ' + data[i].pad.location.name
        
                //Append the li element to the HTML id 
                flightsEl.appendChild(br);
                flightsEl.appendChild(flightsListItem);
                flightsEl.appendChild(flightsListLabel);

              }
        })
}

// Function to retrieve planetary info
function getDestination() {
    var requestURL = 'https://api.le-systeme-solaire.net/rest/bodies/';

    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            var data = data.bodies;
            console.log(data);
            
            for (var i = 0; i < data.length; i++) {
                    if (data[i].isPlanet == true) {
                    //Create a list element
                    var destinationsListItem = document.createElement('input');
                    var destinationsListLabel = document.createElement('label');
                    var br = document.createElement('br');
                    
                    destinationsListItem.setAttribute('type', 'radio');
                    destinationsListItem.setAttribute('name', 'destination');
                    
                    //Set the text of the list element to the JSON response property
                    destinationsListLabel.innerHTML = data[i].englishName;
                    destinationsListLabel.setAttribute('for', data[i].englishName);
                    
                    // destinationsListItem.textContent = data[i].date_str + ' - ' + data[i].name + ', ' + data[i].pad.location.name
                    
                    //Append the li element to the HTML id 
                    destinationsEl.appendChild(br);
                    destinationsEl.appendChild(destinationsListItem);
                    destinationsEl.appendChild(destinationsListLabel);
                    
                }

            }
        })
}

getLaunched();
getDestination();