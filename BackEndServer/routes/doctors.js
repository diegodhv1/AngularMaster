// first load library
var express = require('express');

// Encrypt password
var bcrypt = require('bcryptjs');

// Initialization express and variables
var app = express();

// Imports
var Doctor = require('../models/doctor')

// Encrypt password
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var middlewareAuthentication = require('../middleware/authentication');

/*
* Get all doctors
*/
app.get('/', (request, response, next) => {

    var from = request.query.from || 0;
    from = Number(from);

    Doctor.find({})
        .exec(
            (err, doctors) => {
                if (err) {
                    return response.status(500).json({
                        ok: false,
                        mensaje: 'Internal error server',
                        errors: err
                    });
                } else {

                    Doctor.count({}, (error, count) => {
                        return response.status(200).json({
                            ok: true,
                            doctors: doctors,
                            count: count
                        });
                    })
                }
            });
});

/*
* Create doctor
*/
app.post('/', middlewareAuthentication.tokenVerification, (req, res) => {
    var body = req.body;

    var doctor = new Doctor({
        name: body.name,
        img: body.img,
        hospital: body.hospital,
        user: body.user
    });

    doctor.save((err, doctorSaved) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error to create doctor',
                errors: err
            });
        }
        return res.status(201).json({
            ok: true,
            body: doctorSaved
        });

    });
});


/*
* Update doctor
*/

app.put('/:id', middlewareAuthentication.tokenVerification, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Doctor.findById(id, (err, doctor) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error to find doctor',
                errors: err
            });
        }

        if (!doctor) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Does not exit a doctor with this ID',
                errors: { message: 'Does not exit a doctor with this ID' }
            });
        }

        doctor.name = body.name;
        doctor.img = body.img;
        doctor.hospital = body.hospital,
            doctor.user = body.user

        doctor.save((err, doctorSaved) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error to update Doctor',
                    errors: err
                });
            }

            return res.status(200).json({
                ok: true,
                body: doctorSaved
            });

        });

    });

});

/*
* Delete doctor by id
*/

app.delete('/:id', middlewareAuthentication.tokenVerification, (req, resp) => {
    var id = req.params.id;
    Doctor.findByIdAndRemove(id, (err, dotorDeleted) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error deleting doctor',
                errors: err
            });
        }

        if (!dotorDeleted) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Error - Doctor does not exist with id provided.',
                errors: err
            });
        }

        return resp.status(200).json({
            ok: true,
            body: dotorDeleted
        });
    });
});


// Export module
module.exports = app;   