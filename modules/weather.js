'use strict';

const axios = require('axios');

// find out what the front is requesting
async function getWeatherData(request, response, next) {
  try {
    let inputLat = request.query.lat;
    let inputLon = request.query.lon;
    // make request to api
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&lang=en&units=I&lat=${inputLat}&lon=${inputLon}&unit=I&days=5`;
    // console.log(url);
    let searchedCity = await axios.get(url);
    // send to front end
    let dataToSend = searchedCity.data.data.map((city) => new Forecast(city));
    response.status(200).send(dataToSend);
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
