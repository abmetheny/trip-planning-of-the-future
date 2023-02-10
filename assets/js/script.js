// DOM element variables
var flightsEl = document.getElementById('flights');
var destinationsEl = document.getElementById('destinations');
var pictureEl = document.getElementById('APOD');
var showTripButton = document.getElementById('show-trip-button');
var flightResultsEl = document.getElementById('flightinfo');
var planetResultsEl = document.getElementById('planetinfo');
var pictureResultsEl = document.getElementById('learn-more-images');

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

    // Function to query API to get more data about user selected input and displays in the destination container
    function getAdditionalData() {
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
                    // console.log(data[i].englishName);
                    // console.log(destinationValue);
                
                    if (data[i].englishName == destinationValue) {
                    // Creates a list element
                    console.log(data[i].moons.length);
                    var moons = document.createElement('li');
                    var avgTemp = document.createElement('li');
                    var gravity = document.createElement('li');

                    var ul = document.createElement('ul');
                    
                    // Sets the text of the list element to the JSON response property
                    moons.innerHTML = 'Moons: ' + data[i].moons.length;
                    avgTemp.innerHTML = 'Average Temp: ' + data[i].avgTemp;
                    gravity.innerHTML = 'Gravity: ' + data[i].gravity;

                    // Adds classes to newly created html elements
                    // moons.classList.add("card-content");
                    // avgTemp.classList.add("card-content");
                    // gravity.classList.add("card-content");

                 
                    // Adds the li element to the HTML id 
                    planetResultsEl.appendChild(ul);
                    ul.appendChild(moons);
                    ul.appendChild(avgTemp);
                    ul.appendChild(gravity);

        
                    }
                }
    
                
        })


    }

    // Function to use user input to fetch pictures from NASA API
    function getPictures() {
        var requestURL = 'https://images-api.nasa.gov/search?q=' + destinationValue + '&media_type=image';
    
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
                    pictureImgEl.classList.add("columns");
                    // pictureImgEl.classList.add("is-one-quarter");


                    pictureImgEl.setAttribute('src', pictureSource);
                    pictureResultsEl.appendChild(pictureImgEl);
    
                }
            })
        //  localStorage.setItem("saved-flight", flightValue);
        // localStorage.setitem("saved-destination", JSON.stringify(destinationValue));
    }

    getPictures();
    getAdditionalData();


}

showTripButton.addEventListener('click', displaySelectedValues);

//for picture carousel -- RA
// initially starting from index 0
var startImage = 0;
//initiate functions automatically
slideCarousel(startImage);

function plusSlides(n) {
    slideCarousel(startImage +=1) ;
}

function currentSlide(n) {
    slideCarousel(startImage = n);
}

function slideCarousel(n)
{   
    //initial count equal to 0 and will increment on it
    var c ;

    var images = document.getElementsByClassName("picture");
    //console.log("image carousel", images);

    if (n > images.length) {startImage = 1}
    if (n < 1) {startImage = images.length}

    for (c = 0; c < images.length; c ++ ){
        images[c].style.display="none";
    }

    //console.log("images[startImage-1] ", images[startImage-1]);

    //console.log("images[startImage-1].getElementsByClassName.display ", images[startImage-1].getElementsByClassName.display);
    images[startImage-1].style.display = "block";

}

