'use strict';

const express = require('express');
const app = express();

let db = require('./db.js');

app.use(express.json());

// Default Route
app.get('/', (req, res, next) => {
  res.send('Homepage');
});
app.use((req, res, next)=>{
  req.requestTime = new Date();
  next();
});

app.use((req, res, next)=> {
  console.log(`Request Type:${req.requestTime}`);
  console.log(`Request Type: ${req.message}`);
  console.log(`Request Type: ${req.method}`);
  console.log(`Request Type: ${req.path}`);
  next();
});

// Route to Get all People
app.get('/people', (req, res, next) => {
  res.send("Congrats! You're running a web application with a client and a server!");
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
app.post('/people', (req, res, next) => {
  res.send("I am happy to be here!!!");
  let record = req.body;
  // what can you do to ensure there are no
  // duplicate ids?
  record.id = Math.floor(Math.random() * 10);
  db.people.push(record);
  res.json(record);
});

// Route to Update a person
app.put('/people/:id', (req, res, next) => {
  const peoples = db.people.find(p => p.id === parseInt(req.params.id));
  if(!peoples) return res.status(404).send('The person with this id was not found');
  const result =  (req.body);
  if(result.error){
    res.status(400).send(result.error);
  }
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





/**------------------------------------///------------------------- */
// Route to Get all People
app.get('/teams', (req, res, next) => {
  res.send("Join those teams!!!");
  let count = db.teams.length;
  let results = db.teams;
  res.json({ count, results }); // res.send + convert the contents of send to json
});

// Route to Get a person
app.get('/teams/:id', (req, res, next) => {
  // the colon (:key) is what tells us to store this key in
  // req.params.key
  let id = req.params.id;
  let record = db.teams.filter(record => record.id === parseInt(id));
  res.json(record[0]);
});

// Route to Create a person
app.post('/teams', (req, res, next) => {
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
  if(!team) return res.status(404).send('The team with this id was not found');
  const result =  (req.body);
  if(result.error){
    res.status(400).send(result.error);
  }
  team.name = req.body.name;
  team.color = req.body.color;
  res.json(team);
});


const start = port => {
  let PORT = port || process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
};

module.exports = {
  server: app,
  start: start
};
