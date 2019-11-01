// first load library
var express = require('express');
var monogoose= require('mongoose'); //librery to conect mongoDB with Express

// Initialization express and variables
var app = express();

// Get
app.get( '/', (request, response, next) => {
    response.status(200).json({
        ok: true,
        mensaje: 'successfull'
    });
} )

// Export module
module.exports = app;