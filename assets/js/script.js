//My API key
const  apiKey = "b85ce65762cbc1b5c430f94bad59fafc";

//Parent where to append the buttons
let fatherButton = document.getElementById("left-side-buttons");


//Load localStorage
let citiesSearched = JSON.parse(localStorage.getItem('citiesSearched')) || [];


function saveState() {
    localStorage.setItem('citiesSearched', JSON.stringify(citiesSearched));
}


//Function for Pre-selected cities
const handleSubmit = (city) => {
    //console.log(`The city is ${city}`);
}

//function for search button
const handleSearch = () =>{
     let city = document.getElementById('city').value.trim();

    if (!city) {
         alert("Write a city name dumbass")
    } else {
        city = normalize(city);
        handleSubmit(city);
        addSearch(city);
        render();
        saveState();
        fetchCoordinate(city).then(coords => {
        fetchWeather(coords.lat, coords.lon);
        });
        document.getElementById('city').value=""
    }

};


//Create the button for the city searched
const createButton = (citySearch) => {
    let div = document.createElement("div");
    let btn = document.createElement("button");

    btn.textContent = citySearch;
    btn.addEventListener("click", () => handleSubmit(citySearch));

    div.appendChild(btn);
    return div;
};


//Render the city searched in a button
const render = () => {

    fatherButton.innerHTML = "";
    
    for(let i=citiesSearched.length-1; i>=0; i--){
        let cityButton = createButton(citiesSearched[i]);

        //console.log(`User ${citiesSearched[i]}:`);

        fatherButton.append(cityButton);

    }


    return;
}

//Add city searched in my array
const addSearch = (search) => {

    if (citiesSearched.includes(search)) {
        alert("You already search this city dumbass. Check the quick search options")
        return;
    }

    if(citiesSearched.length<8){
        citiesSearched.push(search);
        //console.log(`my array ${citiesSearched}`)
    }
    else {
        citiesSearched.shift();
        citiesSearched.push(search);
        //console.log(`my array is ${citiesSearched}`)
    }
    
    return;
}

//Start handling search with click and enter
document.getElementById('search-button').addEventListener('click', handleSearch);
document.getElementById('city').addEventListener('keydown', (e) => {
    if (e.key === "Enter") handleSearch();
});


//Make sure the input is lowerCase except the 1st letter which is uppercase
const normalize = (str) => {
    str = str.toLowerCase();
    let upLetter = str[0].toUpperCase();
    str= str.slice(1);

    str = upLetter + str;
    console.log(str);

    return str;
}

render();

//Connect with the API and fetch the coordinates of the searched city
const fetchCoordinate = (cityName) => {
let requestUrl ="https://api.openweathermap.org/geo/1.0/"
let queryParams = "direct?q=" + cityName + "&limit=1&appid=";

requestUrl = requestUrl + queryParams + apiKey;
console.log(requestUrl);

fetch(requestUrl)
  .then(function (response) {
    // Convert the response into JSON format
    return response.json();
  })

  .then(function (data) {
    if (!data.length) {
        alert("Write an actual city dumbass");
        return; 
    }

    // Inspect the API response
    //console.log("Coordinates:", data);
    let lat = data[0].lat;
    let lon = data[0].lon;

    return lat, lon ;
  })

   .catch(function (error) {
    console.error("Error fetching:", error);
  });
}

//Connect with the API and fetch the weather forecast
const fetchWeather = (latitude, longitude) => {
    let requestUrlWeather ="api.openweathermap.org/data/2.5/forecast?{API key}"
    let queryParamsWeather =`lat=${latitude}&lon=${longitude}&units=imperial&appid=`

    requestUrlWeather = requestUrlWeather + queryParamsWeather + apiKey;
    console.log(requestUrlWeather);
}