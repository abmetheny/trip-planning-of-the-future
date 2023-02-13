// DOM element variables
var landingContainerEl = document.getElementById('first-page-container');
var flightsEl = document.getElementById('flights');
var destinationsEl = document.getElementById('destinations');
var errorMessageEl = document.getElementById('error-message');
var pictureEl = document.getElementById('APOD');
var pictureTitleEl = document.getElementById('APOD-title');
var pictureLearnMoreEl = document.getElementById('APOD-learn-more');
var pictureModalEl = document.getElementById('picture-modal');
var pictureModalContentEl = document.getElementById('picture-modal-content');
var pictureModalBoxEl = document.getElementById('picture-modal-box');
var pictureModalCloseEl = document.getElementById('modal-close');
var showTripButton = document.getElementById('show-trip-button');
var resultsContainerEl = document.getElementById('results-container');
var flightResultsEl = document.getElementById('flightinfo');
var planetResultsEl = document.getElementById('planetinfo');
var pictureResultsEl = document.getElementById('learn-more-images');
var previousSearchesArray = JSON.parse(localStorage.getItem('launchesAndPlanets')) || [];
var previousSearchesContainer = document.getElementById('previous-searches-div');
var launchAndPlanetObject = {}
var previousModalEl = document.getElementById('previous-modal');
var previousModalContentEl = document.getElementById('previous-modal-content');
var previousModalBoxEl = document.getElementById('previous-modal-box');
var previousModalCloseEl = document.getElementById('previous-modal-close');
var previousDestinationsButton = document.getElementById('previous-destinations-button');

var details = "";

// Function to retrieve data on the next 5 upcoming launches
function getLaunched() {
    var requestURL = 'https://fdo.rocketlaunch.live/json/launches/next/5';

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
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
        });

}

// Function to retrieve planetary info
function getDestination() {
    var requestURL = 'https://api.le-systeme-solaire.net/rest/bodies/';

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
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
    var requestURL = 'https://api.nasa.gov/planetary/apod?api_key=GVt2GrNth9Xesu8NrHdzPm1UxRUol2NSiPOveKeM ';

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);


            // Adds the picture to the APOD container
            var pictureTitleContent = document.createElement('h5');
            pictureTitleContent.textContent = data.title;
            pictureTitleEl.append(pictureTitleContent);
            var pictureImgEl = document.createElement('img');
            pictureImgEl.setAttribute('src', data.url);
            pictureLearnMoreEl.append(pictureImgEl);


            // Adds description to the APOD
            details = data.explanation;
            console.log(details);
            var modal = document.createElement('p');
            modal.innerHTML = details;
            pictureModalBoxEl.append(modal);
            
            // Functions and event listeners to display/hide additional APOD information in modal 
            function displayDetails() {
                pictureModalEl.classList.add("is-active");
            };
            function hideDetails() {
                pictureModalEl.classList.remove("is-active");

            }
            pictureLearnMoreEl.addEventListener('click', displayDetails);
            pictureModalCloseEl.addEventListener('click', hideDetails);

        })
}

// Function to populate results fields based on user selections upon button click
function displaySelectedValues() {

    
    var flightValue = document.querySelector('input[name="flight"]:checked').value;
    var destinationValue = document.querySelector('input[name="destination"]:checked').value;
    
    // Check to see if values are selected; if not, reveals error message
    // if (flightValue == null || destinationValue == null){
    //     errorMessageEl.classList.remove('is-hidden');
    // }

    // save the flightValue and destinationValue variables to our launchAndPlanetObject
    launchAndPlanetObject.launch = flightValue;
    launchAndPlanetObject.planetName = destinationValue;

    // save my launchAndPlanetObject to local storage, but remember to stringify its contents
    previousSearchesArray.push(launchAndPlanetObject);
    const arrayStringified = JSON.stringify(previousSearchesArray);
    localStorage.setItem('launchesAndPlanets', arrayStringified);

    // run the renderLocalStorageInfoToPage function now as well
    renderLocalStorageInfoToPage();

    console.log(flightValue);
    console.log(destinationValue);

    // Populates results page with user selected data
    flightResultsEl.innerHTML = "Flight: " + flightValue;
    planetResultsEl.innerHTML = "Destination: " + destinationValue;

    // Function to query API to get more data about user selected input and displays in the destination container
    function getAdditionalData() {
        var requestURL = 'https://api.le-systeme-solaire.net/rest/bodies/';

        fetch(requestURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                var data = data.bodies;
                console.log(data);

                for (var i = 0; i < data.length; i++) {

                    // Searched the data array for a match to user inputs to return additional data
                    if (data[i].englishName == destinationValue) {
                        // Creates a list element for each property to return
                        console.log(data[i].moons.length);
                        var ul = document.createElement('ul');
                        var bodyType = document.createElement('li');
                        var moons = document.createElement('li');
                        var avgTemp = document.createElement('li');
                        var gravity = document.createElement('li');
                        var tilt = document.createElement('li');
                        var mass = document.createElement('li');
                        var flattening = document.createElement('li');
                        var inclination = document.createElement('li');

                        // Sets the text of the list element to the JSON response property
                        bodyType.innerHTML = 'Body Type: ' + data[i].bodyType;
                        moons.innerHTML = 'Moons: ' + data[i].moons.length;
                        avgTemp.innerHTML = 'Mean Temperature: ' + data[i].avgTemp;
                        gravity.innerHTML = 'Surface Gravity: ' + data[i].gravity;
                        tilt.innerHTML = 'Tilt: ' + data[i].axialTilt;
                        mass.innerHTML = 'Mass Value: ' + data[i].mass.massValue;
                        flattening.innerHTML = 'Flattening: ' + data[i].flattening;
                        inclination.innerHTML = 'Inclination: ' + data[i].inclination;

                        // Adds the li element to the newly created ul 
                        planetResultsEl.append(ul);
                        ul.append(bodyType);
                        ul.append(avgTemp);
                        ul.append(gravity);
                        ul.append(moons);
                        ul.append(tilt);
                        ul.append(mass);
                        ul.append(flattening);
                        ul.append(inclination);
                    }
                }
            })

            // Hides landing page and displays results page
            function showHidePages() {

                landingContainerEl.classList.add('is-hidden');
                resultsContainerEl.classList.remove('is-hidden');
            }

        showHidePages();

    }

    // Function to use user input to fetch pictures from NASA API
    function getPictures() {
        var requestURL = 'https://images-api.nasa.gov/search?q=' + destinationValue + '&media_type=image';

        fetch(requestURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                var data = data.collection.items;
                console.log(data);
                // Returns a random selection of three pictures based on user selected destination
                for (var i = 0; i < 3; i++) {
                    var dataIndex = Math.floor(Math.random() * data.length);
                    console.log(i);
                    console.log(dataIndex);
                    var pictureSource = data[dataIndex].links[0].href;
                    console.log(pictureSource);

                    // Adds pictures to the results container
                    var pictureImgEl = document.createElement('img');
                    pictureImgEl.classList.add("column");
                    pictureImgEl.classList.add("is-one-third");
                    pictureImgEl.setAttribute('src', pictureSource);
                    pictureResultsEl.appendChild(pictureImgEl);

                }
            })
        
    }

    getPictures();
    getAdditionalData();

}

//for picture carousel -- RA
// initially starting from index 0
var startImage = 0;
//initiate functions automatically
slideCarousel(startImage);

function plusSlides(n) {
    slideCarousel(startImage += 1);
}

function currentSlide(n) {
    slideCarousel(startImage = n);
}

function slideCarousel(n) {
    //initial count equal to 0 and will increment on it
    var c;

    var images = document.getElementsByClassName("picture");
    //console.log("image carousel", images);

    if (n > images.length) { startImage = 1 }
    if (n < 1) { startImage = images.length }

    for (c = 0; c < images.length; c++) {
        images[c].style.display = "none";
    }

    //console.log("images[startImage-1] ", images[startImage-1]);

    //console.log("images[startImage-1].getElementsByClassName.display ", images[startImage-1].getElementsByClassName.display);
    images[startImage - 1].style.display = "block";

}

function renderLocalStorageInfoToPage() {
    // if the previousSearch array has no items in it, just return out of this function
    if (previousSearchesArray.length == 0) {
        return null;
    }

    previousSearchesArray.forEach((planetAndLaunchObj) => {
        const launchDiv = document.createElement('div');
        const liTag = document.createElement('li');
        liTag.innerHTML = `
        ${planetAndLaunchObj.launch} to ${planetAndLaunchObj.planetName}
        `
        // append my pTag to my launchDiv
        launchDiv.append(liTag);

        // now append my launchDiv to an element which already exists in my DOM, i.e the webpage
        previousSearchesContainer.appendChild(launchDiv);
    });

    // Functions and event listeners to display/hide previous searches in modal 
    function displayDetails() {
        previousModalEl.classList.add("is-active");
    };
    function hideDetails() {
        previousModalEl.classList.remove("is-active");

    }
    previousDestinationsButton.addEventListener('click', displayDetails);
    previousModalCloseEl.addEventListener('click', hideDetails);

}

// Calls responses from each of the three APIs to populate the page and saves selections in local storage
getLaunched();
getDestination();
getAPOD();

// add event listeners here
showTripButton.addEventListener('click', displaySelectedValues);

