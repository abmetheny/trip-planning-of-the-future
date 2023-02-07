// DOM element variables
var flightsEl = document.getElementById('flights');
var destinationsEl = document.getElementById('destinations');
var pictureEl = document.getElementById('APOD');
var showTripButton = document.getElementById('show-trip-button');
var flightResultsEl = document.getElementById('flightinfo');
var planetResultsEl = document.getElementById('planetinfo');
var pictureResultsEl = document.getElementById('learn-more');

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
                flightsListItem.setAttribute('value', data[i].date_str + ' - ' + data[i].name + ', ' + data[i].pad.location.name);

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
                    destinationsListItem.setAttribute('value', data[i].englishName);
                    
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

// Function to populate results fields based on user selections upon button click
function displaySelectedValues() {

    var flightValue = document.querySelector('input[name="flight"]:checked').value;
    var destinationValue = document.querySelector('input[name="destination"]:checked').value;

    console.log(flightValue);
    console.log(destinationValue);

    flightResultsEl.innerHTML = "Flight: " + flightValue;
    planetResultsEl.innerHTML = "Destination: " + destinationValue;

    // Function to use user input to fetch pictures from NASA API
    function getPictures() {
        var requestURL = 'https://images-api.nasa.gov/search?keywords=' + destinationValue + '&media_type=image';
    
        fetch(requestURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                var data = data.collection.items;
                console.log(data);
                for (var i = 0; i < 3; i++) {
                    var dataIndex = Math.floor(Math.random() * data.length);
                    console.log(i);
                    console.log(dataIndex);
                    var pictureSource = data[dataIndex].links[0].href;
                    console.log(pictureSource);
            
                    // Adds pictures to the results container
                    var pictureImgEl = document.createElement('img');
                    pictureImgEl.setAttribute('src', pictureSource);
                    pictureResultsEl.appendChild(pictureImgEl);
    
                }
            })
    }

    getPictures();

}

showTripButton.addEventListener('click', displaySelectedValues);