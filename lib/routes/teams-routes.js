'use strict';

const express = require('express');
const router = express.Router();

const app = express();

let db = require('../db.js');
app.use(express.json());

/**
 * takes string and return string mesaage
 * @param {string} str
 */
const setMessage = (str) => {
  return (req, res, next) => {
    req.setMessage = str;
    console.log(req.setMessage);
    next();
  };
};

/**
 * @route GET /teams
 * @param {object}req The request object.
 * @param {object}res The response object and here it response the count reults of our db record length of teams
 * @param {function}next we dont use it in here
 * This defaults to string message, and  enables us to get all teams record in our db
 */

router.get('/teams', setMessage('hi Team!'),  (req, res, next) => {
  let count = db.teams.length;
  let results = db.teams;
  res.json({ count, results }); // res.send + convert the contents of send to json
});

/**
 * @route GET /:id This defaults to string message, and enables us to get our teams record by id
 * @param {object} req The request object.We request data id
 * @param {object} res  This replay filtered teams record
 * @param {function} next we dont use it in here
 */


router.get('/teams/:id', setMessage('HI THERE!'), (req, res, next) => {
  let id = req.params.id;
  let record = db.teams.filter(record => record.id === parseInt(id));
  res.json(record[0]);
});

/**
 * @route POST /teams
 * @param {object} req The request object. We request for record id
 * @param {object} res  This replay people record with requested ID
 * @param {function} next we dont use it in here
 * this route defaults to a string message,
 * and create new record to our data by assigning random id for the object
 */
router.post('/teams', setMessage('welcome to Team!'), (req, res, next) => {
  let record = req.body;
  // what can you do to ensure there are no
  // duplicate ids?
  record.id = Math.floor(Math.random() * 10);
  db.teams.push(record);
  res.json(record);
});

/**
 * @route PUT /:id this route helps us to update a record with required ID
 * @param {object} req  requires record id, and require body of each record field
 * @param {object} res  response the updated record
 * @param {object} next we dont use it in here
 */


router.put('/teams/:id', (req, res, next) => {
  const team = db.teams.find(t => t.id === parseInt(req.params.id));
  const result = (req.body);
  if (result.error) {
    res.status(400).send(result.error);
  }
  team.name = req.body.name;
  team.color = req.body.color;
  res.json(team);
});

/**
 * @route DELETE /:id this route helps us to delete a record with required ID
 * @param {object}req  requires record id
 * @param {object}res  response deleted record
 * @param {object}next we dont use it in here
 */

router.delete('/teams/:id', (req, res, next) => {
  const team = db.teams.find(t => t.id === parseInt(req.params.id));
  //function indexOf search for the id index and splice
  const index = db.teams.indexOf(team);
  db.teams.splice(index, 1);
  res.send(team);
});




module.exports = router;


