// first load library
var express = require('express');

// Encrypt password
var bcrypt = require('bcryptjs');

// Initialization express and variables
var app = express();

// Imports
var User = require('../models/user')

// Encrypt password
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var middlewareAuthentication = require('../middleware/authentication');


/*
* Get all users
*/
app.get('/', middlewareAuthentication.tokenVerification ,  (request, response, next) => {

    User.find({}, 'name email img role')
        .exec(
            (err, users) => {
                if (err) {
                    return response.status(500).json({
                        ok: false,
                        mensaje: 'Internal error server',
                        errors: err
                    });
                } else {
                    return response.status(200).json({
                        ok: true,
                        users: users
                    });
                }
            });


});

/*
* Create users
*/
app.post('/', middlewareAuthentication.tokenVerification , (req, res) => {
    var body = req.body;
    var user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    user.save((err, userSave) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error to create user',
                errors: err
            });
        }
        return res.status(201).json({
            ok: true,
            body: userSave
        });

    });
});


/*
* Update users
*/

app.put('/:id', middlewareAuthentication.tokenVerification , (req, res) => {
    var id = req.params.id;
    var body = req.body;

    User.findById(id, (err, user) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error to find user',
                errors: err
            });
        }

        if (!user) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Does not exit an user with this ID',
                errors: { message: 'Does not exit an user with this ID' }
            });
        }

        user.name = body.name;
        user.email = body.email;
        user.role = body.role;

        user.save((err, userSave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error to update user',
                    errors: err
                });
            }
            userSave.password = '****';
            return res.status(200).json({
                ok: true,
                body: userSave
            });

        });



    });

});

/*
* Delete user by id
*/

app.delete('/:id', middlewareAuthentication.tokenVerification , (req, resp) => {
    var id = req.params.id;
    User.findByIdAndRemove(id, (err, userDeleted) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error deleting user',
                errors: err
            });
        }

        if (!userDeleted) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Error - User does not exist with id provided.',
                errors: err
            });
        }

        userDeleted.password = '****';
        return resp.status(200).json({
            ok: true,
            body: userDeleted
        });
    });
});

// Export module
module.exports = app;   