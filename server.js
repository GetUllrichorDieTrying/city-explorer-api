'use strict';

console.log('Our first server');

// REQUIRE
const express = require('express');
require('dotenv').config();

// USE
const app = express();
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (request, response) => {
  response.send('Hello from the SERVER down UNDR')
});

app.get('/weather', (request, response) => {
  console.log(request.query.name);
  response.send('HELLO MOTTER TRUCKA')
});

// Catch all "star route"***
app.get('*', (request, response) => {
  response.send('What you have requested does not exit...')
});

// ERRORS


// CLASSES


// LISTEN
app.listen(PORT, () => console.log(`LISTENING ON YO PORT ${PORT}`));
