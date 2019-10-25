// first load library
var express = require('express');
    //librery to conect mongoDB with Express
var monogoose= require('mongoose');

// Initialization express and variables
var app = express();

// open port
app.listen(3000, () => {
    // \x1b[32m%s\x1b[0m add green color to text 'online'
    console.log('Express server on 300 port: \x1b[32m%s\x1b[0m', 'OK');
    
})

// Create conexion
monogoose.connection.openUri('mongodb://localhost/hospitalDB', (error, response) => {
    if( error ) throw error;
    console.log('MonogDB conected successfully: \x1b[32m%s\x1b[0m', 'OK');
});

// Routes
app.get( '/', (request, response, next) => {
    response.status(200).json({
        ok: true,
        mensaje: 'successfull'
    });
} )

/* Diferent color of the console
Reset = "\x1b[0m"

Bright = "\x1b[1m"

Dim = "\x1b[2m"

Underscore = "\x1b[4m"

Blink = "\x1b[5m"

Reverse = "\x1b[7m"

Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"

FgRed = "\x1b[31m"

FgGreen = "\x1b[32m"

FgYellow = "\x1b[33m"

FgBlue = "\x1b[34m"

FgMagenta = "\x1b[35m"

FgCyan = "\x1b[36m"

FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"

BgRed = "\x1b[41m"

BgGreen = "\x1b[42m"

BgYellow = "\x1b[43m"

BgBlue = "\x1b[44m"

BgMagenta = "\x1b[45m"

BgCyan = "\x1b[46m"

BgWhite = "\x1b[47m"
*/