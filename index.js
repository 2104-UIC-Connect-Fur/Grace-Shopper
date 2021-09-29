/* eslint-disable no-unused-vars */
// This is the Web Server
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const { serverPort } = require('./config');
const { client } = require('./db');

const server = express();
const PORT = process.env.PORT || serverPort;

// create logs for everything
server.use(morgan('dev'));

// handle application/json requests
// add cookie parser
server.use(express.json());
server.use(cookieParser());
// here's our static files
server.use(express.static(path.join(__dirname, 'build')));

// here's our API
server.use('/api', require('./routes'));

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.use((err, req, res, next) => {
  const { message } = err;
  if (message) return res.send(message);
  res.send(err);
});

server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error('Database is closed for repairs! :(\n', error);
  }
});
