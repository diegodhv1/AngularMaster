// first load library
var express = require('express');

var fileupload = require('express-fileupload');
var fs = require('fs');

// Initialization express and variables
var app = express();

// Imports
var User = require('../models/user')
var Hospital = require('../models/hospital')
var Doctor = require('../models/doctor')


// import controller with ES6 way


// default option
app.use(fileupload());
const extensions = ['png', 'jpg', 'jpeg', 'gif'];
const collections = ['hospital', 'user', 'doctor'];

/*
* upllad image
*/
app.put('/:type/:id', (request, response, next) => {

  const typeCollection = request.params.type;
  const id = request.params.id;
  const imagen = request.files.imagen;

  if (collections.indexOf(typeCollection) < 0) {
    return response.status(400).json({
      ok: false,
      message: 'Type collection not valid',
      error: { message: 'provide a collection' }
    });
  }

  if (!request.files) {
    return response.status(400).json({
      ok: false,
      message: 'File not found',
      error: { message: 'provide image' }
    });
  }

  if (validExtension(imagen)) {
    return response.status(400).json({
      ok: false,
      message: 'Not valid extension',
      error: { message: 'Valid extension: ' + extensions.join(',') }
    });
  }

  fileName = getFileName(id, getExtension(imagen));
  const path = generatePath(typeCollection, fileName);

  imagen.mv(path, error => {

    if (error) {
      return response.status(500).json({
        ok: false,
        message: 'Error moving file',
        error: error
      });
    }

    uploadByType(typeCollection, id, fileName, response);

  })

});

function uploadByType(typeCollection, id, fileName, res) {


  if (typeCollection == 'user') {

    User.findById(id, (err, user) => {

      if (err) {
        messageResponse(500, false, 'Error to find user', res, { error: err });
      }

      const oldPath = getOldPath(user.img, typeCollection);      

      if (existPath(oldPath) && user.img != "") {
        fs.unlink(oldPath, (err) => {
          if (err) {
            messageResponse(500, false, 'Error deleting old image', res, { error: err });
          }
          user.img = fileName;
          user.save((err, userUpdated) => {
            messageResponse(200, true, 'imagen user updated', res, { userUpdated: userUpdated });
          });
        });
      } else {
        user.img = fileName;
        user.save((err, userUpdated) => {
          messageResponse(200, true, 'imagen user updated', res, { userUpdated: userUpdated });
        });
      }

    });
  }

  if (typeCollection == 'hospital') {

    Hospital.findById(id, (err, hospital) => {

      if (err) {
        messageResponse(500, false, 'Error to find hospital', res, { error: err });
      }

      const oldPath = getOldPath(hospital.img, typeCollection);      
      
      if (existPath(oldPath) && hospital.img != "") {
        fs.unlink(oldPath, (err) => {
          if (err) {
            messageResponse(500, false, 'Error deleting old image', res, { error: err });
          }
          hospital.img = fileName;
          hospital.save((err, userUpdated) => {
            messageResponse(200, true, 'imagen hospital updated', res, { userUpdated: userUpdated });
          });
        });
      } else {
        hospital.img = fileName;
        hospital.save((err, userUpdated) => {
          messageResponse(200, true, 'imagen hospital updated', res, { userUpdated: userUpdated });
        });
      }

    });
  }

  if (typeCollection == 'doctor') {

    Doctor.findById(id, (err, doctor) => {

      if (err) {
        messageResponse(500, false, 'Error to find hospital', res, { error: err });
      }

      const oldPath = getOldPath(doctor.img, typeCollection);      
      
      if (existPath(oldPath) && doctor.img != "") {
        fs.unlink(oldPath, (err) => {
          if (err) {
            messageResponse(500, false, 'Error deleting old image', res, { error: err });
          }
          doctor.img = fileName;
          doctor.save((err, userUpdated) => {
            messageResponse(200, true, 'imagen doctor updated', res, { userUpdated: userUpdated });
          });
        });
      } else {
        doctor.img = fileName;
        doctor.save((err, userUpdated) => {
          messageResponse(200, true, 'imagen doctor updated', res, { userUpdated: userUpdated });
        });
      }

    });
  }


}

function getOldPath(img, typeCollection) {
  return `./uploads/${ typeCollection }/${ img }`;
}

function existPath(oldPath) {
  return fs.existsSync(oldPath);
}

function messageResponse(code, state, message, response, data) {
  return response.status(code).json({
    ok: state,
    message: message,
    data: data
  });
}

function validExtension(imagen) {
  const extension = getExtension(imagen);
  let validExtensionFlag = false;

  if (extensions.indexOf(extension) < 0) {
    validExtensionFlag = true;
  }
  return validExtensionFlag;
}

function getExtension(imagen) {
  const name = imagen.name.split('.');
  return name[name.length - 1];
}

function getFileName(id, extension) {
  return `${id}-${new Date().getMilliseconds()}.${extension}`;
}

function generatePath(typeCollection, fileName) {
  return `./uploads/${typeCollection}/${fileName}`;
}

module.exports = app;