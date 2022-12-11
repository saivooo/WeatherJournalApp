// Setup empty JS object to act as endpoint for all routes
// projectData = {};
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
//initialize the port you want to run on
const port = 8000;
//Set your variable named server, and pass the listen method with two arguments port and listening.
const server = app.listen(port, listening =>{console.log(`Running on localhost: ${port}`)});

app.get('/all', function(req, res){
    res.send(projectData);
})

// const data = [];

app.post('/addWeatherData', addWeatherData);

function addWeatherData (req, res){
    const newEntry = {
        temperature: req.body.temp,
        date: req.body.newDate,
        mood: req.body.currentFeelings,
        key: req.body.apiKey
    }
    // data.push(newEntry);
    projectData.push(newEntry);
    console.log(projectData);
}

