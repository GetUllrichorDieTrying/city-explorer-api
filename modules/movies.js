'use strict';

const axios = require('axios');

// find out what the front is requesting
async function getMovieData(request, response, next) {
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
    next(error);
  }
}
// CLASSES
class Movie {
  constructor(movieObj) {
    this.title = movieObj.original_title;
    this.image = movieObj.backdrop_path;
  }
}

module.exports = getMovieData;
