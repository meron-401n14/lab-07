'use strict';

const express = require('express');
const router = express.Router();
const app = express();


const valid = () => {
  return (req, res, next) => {
    req.valid = Math.random() >= 0.5;
    next();
  };
};
// have a function that sets req.message called "setMessage"
const setMessage = (str) => {
  return (req, res, next) => {
    req.setMessage = 'str';
    console.log(req.setMessage);
    next();
  };
};


// Route to Get all People
//app.get('/people', setMessage('test'), logger, (req, res, next) => {
app.get('/people', setMessage('halue'), (req, res, next) => {
  //res.send("Congrats! You're running a web application with a client and a server!");
  let count = db.people.length;
  let results = db.people;
  res.json({ count, results }); // res.send + convert the contents of send to json
});

// Route to Get a person
app.get('/people/:id', (req, res, next) => {
  // the colon (:key) is what tells us to store this key in
  // req.params.key
  let id = req.params.id;
  let record = db.people.filter(record => record.id === parseInt(id));
  res.json(record[0]);
});

// Route to Create a person
//valid(), setMessage('welcome here!'),
app.post('/people', valid(), (req, res, next) => {

  let record = req.body;
  // what can you do to ensure there are no
  // duplicate ids?
  if (req.valid === true) {
    db.people.push(record);
    record.id = Math.floor(Math.random() * 10);
    res.json(record);
  } else {
    res.status(500).send('it is false');
  }
});

// Route to Update a person
app.put('/people/:id', (req, res, next) => {
  const peoples = db.people.find(p => p.id === parseInt(req.params.id));

  peoples.firstName = req.body.firstName;
  peoples.lastName = req.body.lastName;
  peoples.birthday = req.body.birthday;
  peoples.likes = req.body.likes;
  peoples.team = req.body.team;
  res.json(peoples);
});

// Route to Delete a person
app.delete('/people/:id', (req, res, next) => {
  const peoples = db.people.find(p => p.id === parseInt(req.params.id));
  const index = db.people.indexOf(peoples);
  db.people.splice(index, 1);
  res.send(peoples);
});





module.exports = router;
