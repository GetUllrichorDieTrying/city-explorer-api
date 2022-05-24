'use strict';

const axios = require('axios');
let cache = require('./cache');

// find out what the front is requesting
async function getWeatherData(req, res, next) {
  try {
    const inputLat = req.query.lat;
    const inputLon = req.query.lon;
    const key = inputLat + inputLon + '-WeatherData';
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&lang=en&units=I&lat=${inputLat}&lon=${inputLon}&unit=I&days=5`;
    if (cache[key] && Date.now() - cache[key].timestamp < 500000) {
      console.log('Cache hit');
      res
        .status(200)
        .send(cache[key].data.data.data.map((city) => new Forecast(city)));
    } else {
      console.log('Cache miss');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = await axios.get(url);
      const dataToParse = cache[key].data.data.data;
      const weatherDataToSend = dataToParse.map((city) => new Forecast(city));
      res.send(weatherDataToSend);
    }
  } catch (error) {
    next(error);
  }
}

// CLASSES
class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.datetime;
    this.description = weatherObj.weather.description;
    this.maxTemp = Math.round(weatherObj.app_max_temp);
    this.minTemp = Math.round(weatherObj.min_temp);
  }
}

module.exports = getWeatherData;
