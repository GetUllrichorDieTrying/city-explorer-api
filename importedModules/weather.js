'use strict';

let cache = require('./cache.js');

// FUNCTIONS-----------------------------------------------------------------------

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  getWeather(lat, lon)
    .then((summaries) => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

// GET DATA -------------------------------------------------------
function getWeather(latitude, longitude) {
  const key = 'weather-' + latitude + longitude;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

  // console.log(url);

  if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios
      .get(url)
      .then((response) => parseWeather(response.data));
    console.log(response.data);
  }

  return cache[key].data;
}

// PARSE----------------------------------------------
function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map((day) => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

// CLASSES-------------------------------------------------------------------------

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}

module.exports = weatherHandler;
