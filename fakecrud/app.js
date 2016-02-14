"use strict";
/* jshint node:true */

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json({
  extended: true
}));

// Model
var Person = function(data) {
  var requiredFields = Person.fields.filter((f) => f.required);
  for (var fieldKey in requiredFields) {
    var field = requiredFields[fieldKey];
    if (typeof data[field.name] === "undefined") {
      throw new Error(`Person's field ${field.name} is required`);
    }
  }
  this.id = data.id;
  this.firstName = data.firstName;
  this.lastName = data.lastName;
  this.comment = "" || data.comment;
};

Person.fields = [
  {name:"id", required: true},
  {name:"firstName", required: true},
  {name:"lastName", required: true},
  {name:"comment", required: false},
];

Person.prototype.update = function(data) {
  for (var fieldKey in Person.fields) {
    var field = Person.fields[fieldKey];
    if (typeof data[field.name] !== "undefined") {
      this[field.name] = data[field.name];
    }
  }
};

Person.getById = function(id) {
  var filteredPersons = persons.filter(
    (p) => p.id == id
  );

  if (!filteredPersons.length) {
    return;
  }

  return filteredPersons[0];
};

// Sample data
var persons = [
  new Person({id:0, firstName:"Admin", lastName: "Adminov"}),
  new Person({id:1, firstName:"Mike", lastName: "Duglas", comment:"Famous actor"}),
];

app.get('/api', function (req, res) {
  res.send('API is running');
});

var router = express.Router();

var personsRoute = router.route('/persons');

// Allow CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

// Create
personsRoute.post(function(req, res, next) {
  var person;

  // HACK to create without id
  req.body.id = 1 + persons.reduce((prev, p) => Math.max(prev, p.id), 0);

  try {
    person = new Person(req.body);
  } catch (e) {
    return next(e);
  }
  persons.push(person);
  res.json({ message: 'Success created!', data: person });
});

// Get all
personsRoute.get(function(req, res) {
  res.json(persons);
});

var personRoute = router.route('/persons/:id');

// Get one
personRoute.get(function(req, res) {
  var person = Person.getById(req.params.id);
  if (!person) {
    return res.json({error: "Not found person with id " + req.params.id});
  }

  res.json(person);
});

// Modify
personRoute.put(function(req, res) {
  var person = Person.getById(req.params.id);
  if (!person) {
    return res.json({error: "Not found person with id " + req.params.id});
  }

  person.update(req.body);

  res.json({ message: 'Success updated!', data: person});
});

// Delete
personRoute.delete(function(req, res) {
  var person = Person.getById(req.params.id);
  if (!person) {
    return res.json({error: "Not found person with id " + req.params.id});
  }
  persons = persons.filter((p) => p.id !== person.id);

  res.json({ message: 'Success deleted!', data: person});
});

app.use('/api', router);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.json({ error: err.message});
});

app.listen(1337, function(){
  console.log('Fake CRUD server listening on port 1337');
});
