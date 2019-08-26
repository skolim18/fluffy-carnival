const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const validate = require('mongoose-validator');
const validator = require('validator');

const FriendSchema = new Schema({
    friendId: String,
    status: String,
    inviteToken: String
    });

mongoose.model('friend', FriendSchema, 'friends');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate:
            [validator.isEmail, 'Email not correct']
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
        enum: ["female", "male", "other"],
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
    },
    guid: {
        type: String
    },
    resetPasswordToken: {
        type: String,
        default: ""
    },
    expirationTokenDate: {
        type: Date
    },
    isVerified: { 
        type: Boolean, 
        default: false
    },
    role: {
        type: String,
        enum: ["User", "Admin", "Moderator"],
        default: "User"
    },
    friends: {
        type: [mongoose.Schema.Types.Object],
        ref: 'friends'
    }
})

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.encrypt = function () {
    return bcrypt.hash(this.password, 12)
        .then(hash => this.password = hash);
}

UserSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email });
}

module.exports = model('User', UserSchema);