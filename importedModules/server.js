'use strict';

require('dotenv');
const express = require('express');
const cors = require('cors');

const weatherHandler = require('./weather.js');

const app = express();

app.get('/weather', weatherHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server up on ${process.env.PORT}`)
);
