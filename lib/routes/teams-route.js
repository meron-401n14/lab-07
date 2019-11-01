'use strict';

const express = require('express');
const router = express.Router();
const app = express();


// Route to Get all Teams
app.get('/teams', setMessage('hi Team!'), (req, res, next) => {

  let count = db.teams.length;
  let results = db.teams;
  res.json({ count, results }); // res.send + convert the contents of send to json
});

// Route to Get a person
app.get('/teams/:id', setMessage('new Team!'), (req, res, next) => {
  // the colon (:key) is what tells us to store this key in
  // req.params.key
  let id = req.params.id;
  let record = db.teams.filter(record => record.id === parseInt(id));
  res.json(record[0]);
});

// Route to Create a person
app.post('/teams', setMessage('welcome Team!'), (req, res, next) => {
  let record = req.body;
  // what can you do to ensure there are no
  // duplicate ids?
  record.id = Math.floor(Math.random() * 10);
  db.teams.push(record);
  res.json(record);
});

// Route to Update a person
app.put('/teams/:id', (req, res, next) => {
  const team = db.teams.find(t => t.id === parseInt(req.params.id));
  //if(!team) return res.status(404).send('The team with this id was not found');
  const result = (req.body);
  if (result.error) {
    res.status(400).send(result.error);
  }
  team.name = req.body.name;
  team.color = req.body.color;
  res.json(team);
});


// have a function that sets req.requestTime 
const requestTime = (req, res, next) => {
  req.requestTime = (new Date().toUTCString());
  console.log(req.requestTime);
  next();
};

const eachRequest = (req, res, next) => {
  console.log(`req.path, req.method,req.message and requestTime: ${req.path}, ${req.method}, ${req.requestTime}, ${req.message}`)
  next();
};
const valid  = ()=> {
  return (req, res, next)=>{
    req.valid = Math.random() >= 0.5;
    next();
  };
};
// have a function that sets req.message called "setMessage"
const setMessage = (str) => {
  return (req, res, next) => {
    req.message = str;
    next();
  };
};



module.exports = router;
