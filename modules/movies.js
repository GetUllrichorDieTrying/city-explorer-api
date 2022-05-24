'use strict';

const axios = require('axios');
let cache = require('./cache');

// GET DATA-----------------------------------------------
const getMovieData = async function (req, res, next) {
  try {
    const input = req.query.city;
    const key = input + 'MovieData';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&query=${input}`;

    if (cache[key] && Date.now() - cache[key].timestamp < 500000) {
      console.log('Cache hit');
      res
        .status(200)
        .send(cache[key].data.data.results.map((city) => new Movie(city)));
    } else {
      console.log('Cache miss');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = await axios.get(url);
      const movieDataToSend = cache[key].data.data.results.map(
        (city) => new Movie(city)
      );
      res.send(movieDataToSend);
    }
  } catch (error) {
    next(error);
  }
};

// CLASSES
class Movie {
  constructor(movieObj) {
    this.title = movieObj.original_title;
    this.image = movieObj.backdrop_path;
  }
}

module.exports = getMovieData;
