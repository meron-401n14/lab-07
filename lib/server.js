
'use strict';

const express = require('express');

const routesPeople= require('./routes/people-routes.js');
const routesTeam = require('./routes/teams-routes.js');

const errorHandler = require('../middleware/error.js');
const notFound = require('../middleware/404.js');

const router = express.Router();



const app = express();

/**
 * @route GET /api/v1/
 * @param {object} req
 * @param {object} res sending home page text
 * @param {function} next we dont use it here
 */


app.get('/', (req, res, next) => {
  res.send('Homepage');
});

/**
 * This takes three params and return current time with UTC string format
 * @param {object} req request for current time
 * @param {object} res we do not use it here
 * @param {function} next go to next middleware logger
 */

const requestTime = (req, res, next) => {
  req.requestTime = (new Date().toUTCString());
  // console.log(req.requestTime);
  next();
};

/**
 * Takes three params and prints path , time & message
 * @param {function} req method, time and message function
 * @param {function} res
 * @param {function} next
 */
const logger = (req, res, next) => {
  console.log(`req.path, req.method, requestTime and req.message:
  ${req.path}, ${req.method}, ${req.requestTime}`);
  next();
};

app.use(express.json());

//middlewares
app.use(requestTime);
app.use(logger);

// app level MiddleWare
app.use(routesTeam);
app.use(routesPeople);

// Error Handling
app.use(errorHandler);
app.use(notFound);

const start = port => {
  let PORT = port || process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
};



module.exports = { server: app, start: start};




