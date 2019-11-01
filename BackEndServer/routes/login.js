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

app.post('/', (req, resp) => {
    var body = req.body;

    User.findOne({ email: body.email }, (err, userFounded) => {

        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error finding user',
                errors: err
            });
        }

        if (!userFounded) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Credentials invalid - email',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, userFounded.password)) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Credentials invalid - password',
                errors: err
            });
        }

        /* create token
        * @params Data, seed, date expiration
        */

        var token = jwt.sign({ user: userFounded }, SEED, { expiresIn: 14400 })
        userFounded.password = "***";
        return resp.status(200).json({
            ok: true,
            user: userFounded,
            token: token,
            id: userFounded.id
        });

    });


});

// Export module
module.exports = app;  