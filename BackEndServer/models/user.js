var mongoose = require('mongoose');
// validation of fields
var uniqueValidator = require('mongoose-unique-validator');

// Valid roles
var validRoles= {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
};

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    name: { type: String, required: [true, 'Name field is empty'] },
    email: { type: String, unique: true, required: [true, 'Email field is empty'] },
    password: { type: String, required: [true, 'Password field is empty'] },
    img: { type: String, required: false, default: '' },
    role: { type: String, required: false, default: 'ADMIN_ROLE', enum: validRoles },
});

usuarioSchema.plugin(uniqueValidator, { message: 'The {PATH} must be unique.' })

module.exports = mongoose.model('User', usuarioSchema);