'use strict';

// REQUIRE
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const getWeatherData = require('./modules/weather');
const getMovieData = require('./modules/movies');

// USE
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

// ROUTES
app.get('/', (request, response) => {
  response.send('Welcome to your favorite server!');
});
app.get('/weather', getWeatherData);
app.get('/movies', getMovieData);

// Catch all "star route"***
app.get('*', (request, response) => {
  response.send('What you have requested does not exist...');
});

// ERRORS
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`LISTENING ON YO PORT ${PORT}`));
