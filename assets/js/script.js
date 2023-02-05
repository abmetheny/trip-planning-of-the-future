// DOM element variables
var flightsEl = document.getElementById('flights');
var destinationsEl = document.getElementById('destinations');
var pictureEl = document.getElementById('APOD');

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
                // Creates a list element for each upcoming flight
                var flightsListItem = document.createElement('input');
                var flightsListLabel = document.createElement('label');
                var br = document.createElement('br');

                flightsListItem.setAttribute('type', 'radio');
                flightsListItem.setAttribute('name', 'flight');
        
                // Sets the text of the list element to the JSON response property
                flightsListLabel.innerHTML = data[i].date_str + ' - ' + data[i].name + ', ' + data[i].pad.location.name;
                flightsListLabel.setAttribute('for', data[i].name);
        
                // Adds the li element to the HTML id 
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
                    // Creates a list element for each result that is a planet
                    var destinationsListItem = document.createElement('input');
                    var destinationsListLabel = document.createElement('label');
                    var br = document.createElement('br');
                    
                    destinationsListItem.setAttribute('type', 'radio');
                    destinationsListItem.setAttribute('name', 'destination');
                    
                    // Sets the text of the list element to the JSON response property
                    destinationsListLabel.innerHTML = data[i].englishName;
                    destinationsListLabel.setAttribute('for', data[i].englishName);
                                       
                    // Adds the li element to the HTML id 
                    destinationsEl.appendChild(br);
                    destinationsEl.appendChild(destinationsListItem);
                    destinationsEl.appendChild(destinationsListLabel);
                    
                }

            }
        })
}

// Function to retrieve Astronomy Picture of the Day
function getAPOD() {
    var requestURL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            
            // Adds the picture to the APOD container
            var pictureImgEl = document.createElement('img');
            pictureImgEl.setAttribute('src', data.url);
            pictureEl.appendChild(pictureImgEl);

            // Adds title to the APOD container
            var pictureTitleEl = document.createElement('h2');
            pictureTitleEl.textContent = data.title;
            pictureEl.appendChild(pictureTitleEl);

            // Adds description to the APOD container
            var pictureDescriptionEl = document.createElement('p');
            pictureDescriptionEl.textContent = data.explanation;
            pictureEl.appendChild(pictureDescriptionEl);


        })
}

// Calls responses from each of the three APIs to populate the page
getLaunched();
getDestination();
getAPOD();