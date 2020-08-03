// Imports
var User = require('../models/user')

const controller = {};

/*
* Get all users
*/

controller.get = (request, response) => {

  var from = request.query.from || 0;
  from = Number(from);

  User.find({}, 'name email img role')
    .skip(from)
    .limit(5)
    .exec(
      (err, users) => {
        if (err) {
          return response.status(500).json({
            ok: false,
            mensaje: 'Internal error server',
            errors: err
          });
        } else {
          User.count({}, (error, count) => {
            return response.status(200).json({
              ok: true,
              users: users,
              count: count
            });
          });
        }
      });
}

export default controller;