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

  let dataToSend = searchedCity.data.map(city => new Forecast(city))
  response.send(dataToSend);
});

// Catch all "star route"***
app.get('*', (request, response) => {
  response.send('What you have requested does not exist...')
});

// ERRORS`


// CLASSES
class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.datetime;
    this.description = weatherObj.weather.description;
  }
}
// console.log(weatherObj);

// LISTEN
app.listen(PORT, () => console.log(`LISTENING ON YO PORT ${PORT}`));
