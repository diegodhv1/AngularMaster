// first load library
var express = require('express');

// Encrypt password
var bcrypt = require('bcryptjs');

// Encrypt password
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

// Initialization express and variables
var app = express();

// Imports
var User = require('../models/user')
var Hospital = require('../models/hospital')
var Doctor = require('../models/doctor')

/*
* Search all service
*/
app.get('/collection/:collection/:search', (request, response, next) => {

  const search = request.params.search;
  const collection = request.params.collection.toLocaleLowerCase();
  var promise;
  var regEx = new RegExp(search, 'i');

  switch (collection) {
    case 'hospital':
      promise = hospitalSearch(regEx);
      break;
    case 'doctor':
      promise = doctorSearch(regEx);
      break;
    case 'user':
      promise = userSearch(regEx);
      break;
    default:
      return response.status(400).json({
        ok: false,
        message: 'Invalid table parameter'
      });
  }


  promise.then(respons => {
    response.status(200).json({
      ok: true,
      collection: respons
    });
  });

});

/*
* Search service by colecction
*/
app.get('/:search', (request, response, next) => {

  var search = request.params.search;
  var regEx = new RegExp(search, 'i');

  Promise.all(
    [
      hospitalSearch(regEx),
      doctorSearch(regEx),
      userSearch(regEx)
    ]).then(respons => {
      response.status(200).json({
        ok: true,
        hospitals: respons[0],
        doctors: respons[1],
        users: respons[2]
      });
    });

});

function hospitalSearch(reg) {

  return new Promise((resolve, reject) => {

    Hospital.find({ name: reg }, (error, hospitals) => {

      if (error) {
        reject('Error load hospitals', error);
      } else {
        resolve(hospitals);
      }
    });
  });

}

function doctorSearch(reg) {

  return new Promise((resolve, reject) => {

    Doctor.find({ name: reg }, (error, doctors) => {

      if (error) {
        reject('Error load doctors', error);
      } else {
        resolve(doctors);
      }
    });
  });
}

function userSearch(reg) {

  return new Promise((resolve, reject) => {

    User.find({}, 'name email role')
      .or([{ 'name': reg }, { 'email': reg }])
      .exec((error, users) => {

        if (error) {
          reject('error load users');
        } else {
          resolve(users);
        }
      });
  });
}

// Export module
module.exports = app;  