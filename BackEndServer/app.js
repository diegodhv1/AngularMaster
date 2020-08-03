// first load library
var express = require('express');
var monogoose= require('mongoose'); //librery to conect mongoDB with Express
var bodyParser = require('body-parser') // middelware 

// Initialization express and variables
var app = express();

// Body parser (create record in mongo)
// create application/x-www-form-urlencoded parser
// Whatever petition ( CRUD ) first it is parse with this funcitons
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import routes
appRoutes = require('./routes/app');
appUser = require('./routes/users');
appLogin = require('./routes/login');
appHospitals = require('./routes/hospitals');
appDoctor = require('./routes/doctors');
appSearch = require('./routes/search');
appUpload = require('./routes/upload');
appImages = require('./routes/images');

// server index config (This code helps the user to find the routes uploads and get the images)
// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));

// Routes
app.use( '/user' , appUser );
app.use( '/login' , appLogin );
app.use( '/hospital' , appHospitals );
app.use( '/doctor' , appDoctor );
app.use( '/search' , appSearch );
app.use( '/upload' , appUpload );
app.use( '/images' , appImages );
app.use( '/' , appRoutes );

// open port
app.listen(3000, () => {
    // \x1b[32m%s\x1b[0m add green color to text 'online'
    console.log('Express server on 300 port: \x1b[32m%s\x1b[0m', 'OK');
    
})

// Create conexion
monogoose.connection.openUri( 'mongodb://localhost/hospitalDB', (error, response) => {
    if( error ) throw error;
    console.log( 'MonogDB: \x1b[32m%s\x1b[0m', 'OK');
});