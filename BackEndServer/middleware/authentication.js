var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

/*
* Token verification
*/
exports.tokenVerification = function (req, res, next) {
    var token = req.query.token;

    jwt.verify(token, SEED, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token not valid',
                errors: error
            });
        }

        req.userToken = decoded.user;
        next();
    })
}
