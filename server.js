'use strict';

// REQUIRE
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');

// USE
const app = express();
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/weather', (request, response) => {
  let cityData = request.query.city;

  let searchedCity = data.find(city => city.city_name.toLowerCase() === cityData.toLowerCase());

  let dataToSend = searchedCity.data.

});

// Catch all "star route"***
app.get('*', (request, response) => {
  response.send('What you have requested does not exit...')
});

// ERRORS


// CLASSES
class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.date;
    this.description = weatherObj.description;
  }
}

// LISTEN
app.listen(PORT, () => console.log(`LISTENING ON YO PORT ${PORT}`));
