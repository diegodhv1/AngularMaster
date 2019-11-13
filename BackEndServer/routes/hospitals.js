// first load library
var express = require('express');

// Encrypt password
var bcrypt = require('bcryptjs');

// Initialization express and variables
var app = express();

// Imports
var Hospital = require('../models/hospital')

// Encrypt password
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var middlewareAuthentication = require('../middleware/authentication');

/*
* Get all hospitals
*/
app.get('/', (request, response, next) => {

    var from = request.query.from || 0;
    from = Number(from);


    Hospital.find({})
        .exec(
            (err, hospitals) => {
                if (err) {
                    return response.status(500).json({
                        ok: false,
                        mensaje: 'Internal error server',
                        errors: err
                    });
                } else {

                    Hospital.count({}, (error, count) => {
                        return response.status(200).json({
                            ok: true,
                            hospitals: hospitals,
                            count: count
                        });
                    });

                }
            });
});

/*
* Create hospitals
*/
app.post('/', middlewareAuthentication.tokenVerification, (req, res) => {
    var body = req.body;
    var hospital = new Hospital({
        name: body.name,
        img: body.img
    });

    hospital.save((err, hospitalSaved) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error to create hospital',
                errors: err
            });
        }
        return res.status(201).json({
            ok: true,
            body: hospitalSaved
        });

    });
});


/*
* Update hospital
*/

app.put('/:id', middlewareAuthentication.tokenVerification, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Hospital.findById(id, (err, hospital) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error to find Hospital',
                errors: err
            });
        }

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Does not exit a hospital with this ID',
                errors: { message: 'Does not exit a hospital with this ID' }
            });
        }

        hospital.name = body.name;
        hospital.img = body.img;

        hospital.save((err, hospitalSaved) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error to update Hospital',
                    errors: err
                });
            }

            return res.status(200).json({
                ok: true,
                body: hospitalSaved
            });

        });



    });

});

/*
* Delete user by id
*/

app.delete('/:id', middlewareAuthentication.tokenVerification, (req, resp) => {
    var id = req.params.id;
    Hospital.findByIdAndRemove(id, (err, hospitalDeleted) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error deleting hospital',
                errors: err
            });
        }

        if (!hospitalDeleted) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Error - Hospital does not exist with id provided.',
                errors: err
            });
        }

        return resp.status(200).json({
            ok: true,
            body: hospitalDeleted
        });
    });
});


// Export module
module.exports = app;   