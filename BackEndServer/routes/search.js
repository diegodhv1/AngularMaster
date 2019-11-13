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
app.get('/all/:search', (request, response, next) => {

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
          .or( [{'name': reg}, {'email': reg }] )
          .exec( (error, users ) => {

            if( error ){
              reject('error load users');
            } else {
              resolve( users );
            }
          });
  });
}

// Export module
module.exports = app;  