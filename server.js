'use strict';

// REQUIRE
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

// USE
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

// ROUTES
app.get('/', (request, response) => {
  response.send('Welcome to your favorite server!');
});
app.get('/weather', async (request, response) => {
  // find out what front end is rquesting
  try {
    let inputLat = request.query.lat;
    let inputLon = request.query.lon;
    // make request to api
    let url = `https://api.weatherbit.io/v2.0/current?key=${process.env.WEATHERBIT_API_KEY}&lang=en&units=I&lat=${inputLat}&lon=${inputLon}`;
    let find = axios.get(url);
    let results = find.data;
    // send to front end
    console.log(results.data);
    response.send(results);
  } catch (error) {
    next(error);
  }
});

// Catch all "star route"***
app.get('*', (request, response) => {
  response.send('What you have requested does not exist...');
});

// ERRORS
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

// CLASSES
class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.datetime;
    this.description = weatherObj.weather.description;
  }
}

// LISTEN
app.listen(PORT, () => console.log(`LISTENING ON YO PORT ${PORT}`));
