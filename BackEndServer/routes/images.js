// first load library
var express = require('express');
var monogoose = require('mongoose'); //librery to conect mongoDB with Express

// Initialization express and variables
var app = express();
const path = require('path');
const fs = require('fs');
// Get
app.get('/:type/:img', (request, response, next) => {

    const typeColecction = request.params.type;
    const imgId = request.params.img;

    // get the route of the project in the SO 
    const pathImage = path.resolve(__dirname, `../uploads/${typeColecction}/${imgId}`);

    if (fs.existsSync(pathImage)) {
        response.sendFile(pathImage);
    } else {
        const pathNotImage = path.resolve(__dirname, '../assets/no-img.jpg');
        response.sendFile(pathNotImage);
    }
})

// Export module
module.exports = app;