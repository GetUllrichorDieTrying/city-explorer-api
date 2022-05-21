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
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&lang=en&units=I&lat=${inputLat}&lon=${inputLon}&unit=I&days=5`;
    console.log(url);
    let searchedCity = await axios.get(url);
    // send to front end
    let dataToSend = searchedCity.data.data.map((city) => new Forecast(city));
    response.status(200).send(dataToSend);
  } catch (error) {
    // next(error);
  }
});

app.get('/movies', async (request, response) => {
  // find out what front end is rquesting
  try {
    let input = request.query.city;

    // make request to api
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&query=${input}`;
    let searchedCity = await axios.get(url);
    // send to front end
    let movieDataToSend = searchedCity.data.results.map(
      (city) => new Movie(city)
    );
    console.log(movieDataToSend);
    response.status(200).send(movieDataToSend);
  } catch (error) {
    // next(error);
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
    this.maxTemp = Math.round(weatherObj.app_max_temp);
    this.minTemp = Math.round(weatherObj.min_temp);
  }
}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.original_title;
    this.image = movieObj.backdrop_path;
  }
}

// LISTEN
app.listen(PORT, () => console.log(`LISTENING ON YO PORT ${PORT}`));
