'use strict';

const axios = require('axios');
// let cache = require('./cache');
let cache = {};

// HANDLER----------------------------------------------

// function getMovieHandler(req, res) {
//   // const input = req.query.city;
//   getMovieData(input)
//     .then((input) => res.send(input))
//     .catch((error) => {
//       console.error(error);
//       response.status(500).send('Something went very wrong.');
//     });
// }

// GET DATA-----------------------------------------------
const getMovieData = async function (req, res, next) {
  try {
    const input = req.query.city;
    const key = input + 'MovieData';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&query=${input}`;

    if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
      console.log('Cache hit');
      // let finalMoviePackage = parseMovies(cache[key].data);
      res.status(200).send(parseMovies(cache[key].data));
    } else {
      console.log('Cache miss');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = await axios.get(url);
      const movieDataToSend = cache[key].data.data.results.map(
        (city) => new Movie(city)
      );
      // let finalMoviePackage = parseMovies(cache[key].data);
      // console.log(finalMoviePackage);
      res.send(movieDataToSend);
    }
  } catch (error) {
    next(error);
  }
};

// PARSE----------------------------------------------
// function parseMovies(movieData) {
//   try {
//     const movieDataToSend = movieData.data.results.map(
//       (city) => new Movie(city)
//     );
//     return Promise.resolve(movieDataToSend);
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }

// CLASSES
class Movie {
  constructor(movieObj) {
    this.title = movieObj.original_title;
    this.image = movieObj.backdrop_path;
  }
}

module.exports = getMovieData;
