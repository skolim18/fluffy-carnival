const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    bio: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    favouriteMovie: {
        type: String
    }
})

UserSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email });
}

module.exports = model('User', UserSchema);