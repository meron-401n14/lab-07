/* eslint-disable no-undef */
'use strict';

const express = require('express');
const routes= require('./routes/people-routes.js');
const routesTeam = require('./routes/teams-routes.js');

const errorHandler = require('../middleware/error.js');
// eslint-disable-next-line no-undef
const notFound = require('../middleware/404.js');
const app = express();
/**
 * @route GET /api/v1/
 * @param {object} req
 * @returns {object}
 * @param {function} next we dont use it here
*/


app.get('/', (req, res, next) => {
  res.send('Homepage');
});

/**
 * This takes three params and return current time with UTC string format
 * @param {date} req request for current time
 * @param {date} res we do not use it here
 * @param {*} next go to next middleware logger
 */
const requestTime = (req, res, next) => {
  req.requestTime = (new Date().toUTCString());
  // console.log(req.requestTime);
  next();
};

/**
 * Takes three params and prints path , time & message
 * @param {function} req
 * @param {function} res
 * @param {function} next
 */
const logger = (req, res, next) => {
  console.log(`req.path, req.method, requestTime and req.message:
  ${req.path}, ${req.method}, ${req.requestTime}, ${req.setMessage}`);
  next();
};



// app level MiddleWare
app.use(requestTime);
app.use(logger);
//app.use(setMessage);
//app.use('/people', routes);
app.use('/people', routes);
app.use('/teams', routesTeam);

// Error Handling
app.use(errorHandler);

//404 Route
app.use('*', notFound);

const start = port => {
  let PORT = port || process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
};



module.exports = { server: app, start: start};


