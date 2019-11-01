'use strict';

const express = require('express');
const app = express();
const routes = require('./routes/people-routes.js');

let db = require('./db.js');
app.use(express.json());

// Default Route
app.get('/', (req, res, next) => {
  res.send('Homepage');
});

//functions
// have a function that sets req.requestTime
const requestTime = (req, res, next) => {
  req.requestTime = (new Date().toUTCString());
  console.log(req.requestTime);
  next();
};

const eachRequest = (req, res, next) => {
  console.log(`req.path, req.method,requestTime and req.message:
  ${req.path}, ${req.method}, ${req.requestTime}, ${req.setMessage}`);
  next();
};
//MiddleWare
app.use(eachRequest);
app.use(requestTime);
// Routes
app.use(routes);
// app.use('*', (req, res)=>{
//   res.status(404).send('Not Found');
// });

app.use((err, req, res, next)=>{
  res.status(500).send(err);
});


const start = port => {
  let PORT = port || process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
};

module.exports = { server: app, start: start};



















