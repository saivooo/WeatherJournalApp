/* Global Variables */
const response = document.getElementById("feelings").value;
const latLongUrl = "http://api.openweathermap.org/geo/1.0/zip?zip=";
const tempUrl = "https://api.openweathermap.org/data/2.5/weather?lat=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = "e5a0c1dddb993311e6abe63160bb80b5&units=imperial";

// Fuction call to get weather for current zip code
document.getElementById("generate").addEventListener("click", performAction);

// Function to get weather for current zip
function performAction() {
    const zipCode = document.getElementById("zip").value;
    const currentFeelings = document.getElementById("feelings").value;
    //function call that calls weather api to convert user's zip code into latitude and longitude coordinates. This is needed because the api to get the temperature only recieves lat & lon
    getLatLong(latLongUrl, zipCode, apiKey).then(function (data) {
        // console.log(data);
        const lat = data.lat;
        const lon = data.lon;
        //function call that calls weather api to return weather details, including temp from user's lat & lon coordinates
        getTemp(tempUrl, lat, lon, apiKey).then(function (data) {
            // console.log(data);
            const temp = data.main.temp;
            console.log(
                `Temperature: ${temp}\nI'm feeling: ${currentFeelings}\nDate: ${newDate}\nAPI Key: ${apiKey}`
            );
            // async function called that sends a POST request to the server side to store user data
            postData("/addWeatherData", {
                temp,
                newDate,
                currentFeelings,
                apiKey,
            }).then(updateUI());
        });
    });
}

//function to update the UI
const updateUI = async () => {
    const req = await fetch("/all");
    try {
        const allData = await req.json();
        console.log(allData);
        document.getElementById("date").innerHTML = `Date: ${allData[allData.length - 1].date
            }`;
        document.getElementById("temp").innerHTML = `Temperature: ${Math.round(allData[allData.length - 1].temperature)
            } degrees`;
        document.getElementById("content").innerHTML = `Current Mood: ${allData[allData.length - 1].mood
            }`;
    } catch (error) {
        console.log("error", error);
    }
};

//api call to get latitude & longitude of current zip. This is needed to call another api, which returns the temperature
const getLatLong = async (url, zip, key) => {
    const res = await fetch(url + zip + "&appid=" + key);
    try {
        const data = await res.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

//api call to get current temperature for user's zip
const getTemp = async (url, lat, lon, key) => {
    const res = await fetch(url + lat + "&lon=" + lon + "&appid=" + key);
    try {
        const data = await res.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
};
const postData = async (url = "", data = {}) => {
    // console.log(data);
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
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
};
