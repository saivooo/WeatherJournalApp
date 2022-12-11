/* Global Variables */
const response = document.getElementById('feelings').value;
const latLongUrl = 'http://api.openweathermap.org/geo/1.0/zip?zip=';
const tempUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=';

// Personal API Key for OpenWeatherMap API
const apiKey = 'e5a0c1dddb993311e6abe63160bb80b5&units=imperial';

// Fuction call to get weather for current zip code
document.getElementById('generate').addEventListener('click', performAction);

// Function to get weather for current zip
function performAction(){
    const zipCode = document.getElementById('zip').value;
    const currentFeelings = document.getElementById('feelings').value;
    getLatLong(latLongUrl, zipCode, apiKey)
    .then(function(data){
        // console.log(data);
        const lat = data.lat;
        const lon = data.lon;
        getTemp(tempUrl, lat, lon, apiKey)
        .then(function(data){
            // console.log(data);
            const temp = data.main.temp;
            console.log(`Temperature: ${temp}\nI'm feeling: ${currentFeelings}\nDate: ${newDate}\nAPI Key: ${apiKey}`)
            postData('/addWeatherData', {temp, newDate, currentFeelings, apiKey})
            .then(updateUI(temp, newDate, currentFeelings))
        })
    })
}

//function to update the UI
function updateUI(temperature, date, mood){
    document.getElementById('date').innerHTML = `Date: ${date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${temperature}`;
    document.getElementById('content').innerHTML = `Current Mood: ${mood}`;
}

//api call to get latitude & longitude of current zip. This is needed to call another api, which returns the temperature
const getLatLong = async (url, zip, key)=>{
    const res = await fetch(url+zip+'&appid='+key)
    try {
        const data = await res.json();
        // console.log(data);
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

//api call to get current temperature for user's zip
const getTemp = async (url, lat, lon, key)=>{
    const res = await fetch(url+lat+'&lon='+lon+'&appid='+key)
    try {
        const data = await res.json();
        // console.log(data);
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const postData = async (url = '', data = {}) => {
    // console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}
