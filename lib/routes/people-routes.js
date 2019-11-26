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

// this function gernerates random boolean
const valid = () => {
  return (req, res, next) => {
    req.valid = Math.random() >= 0.5;

    next();
  };
};
/**
 * @route GET /people This defaulted to string message and enables us to get all people data in our db
 * @param {object} req The request object.
 * @param {object} res The response object and here it response the count reults of our db
 * @param {function} next we don't use it in here
 */

router.get('/people', setMessage('hi folks'), (req, res, next) => {
  let count = db.people.length;
  let results = db.people;
  res.json({ count, results }); // res.send + convert the contents of send to json
});

/**
 * @route GET /:id   This enables us to get our people data by id
 * @param {object} req The request object.We request data id
 * @param {object} res  This replay people record with requested ID
 * @param {function} next we dont use it in here
 */
router.get('/people/:id', (req, res, next) => {
  let id = req.params.id;
  let record = db.people.filter(record => record.id === parseInt(id));
  res.json(record[0]);
});
/**
 * @route POST /people
 * @param {object} req  requires record id, and require body of each record field
 * @param {object}  res  response the updated record
 * @param {function} next we dont use it in here
 * @return {object} 200 - A record
 * @return {object} 500 - An error
 * this route first defaults a string message,then
 * create new record to our data by assigning random id for the object
 * if the random id is true
 */
router.post('/people', valid(), setMessage('welcome here!'), (req, res, next) => {
  let record = req.body;
  if (req.valid === true){
    db.people.push(record);
    record.id = Math.floor(Math.random() * 10);
    res.json(record);
  } else {
    res.status(500).send('Not created because random is false');
  }
});

/**
 * @route PUT /:id his route helps us to update a record with required ID
 * @param {object} req requires record id, and require body of each record field
 * @param {object} res response the updated record
 * @param {function} next we dont use it in here
 */

router.put('/people/:id', (req, res, next) => {
  const peoples = db.people.find(p => p.id === parseInt(req.params.id));

  peoples.firstName = req.body.firstName;
  peoples.lastName = req.body.lastName;
  peoples.birthday = req.body.birthday;
  peoples.likes = req.body.likes;
  peoples.team = req.body.team;
  res.json(peoples);
});

/**
 * @route DELETE /:id this route helps us to delete a record with required ID
 * @param {object} req  requires record id
 * @param {object} res  response deleted record
 * @param {function} next we dont use it in here
 */

router.delete('/people/:id', (req, res, next) => {
  const peoples = db.people.find(p => p.id === parseInt(req.params.id));
  //@function indexOf search for the id index and splice
  const index = db.people.indexOf(peoples);
  db.people.splice(index, 1);
  res.send(peoples);
});

module.exports = router;






