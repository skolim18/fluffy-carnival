const config = require('../config');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const mailUtils = require('../utils/mail');

exports.postRegisterUser = async (req, res, next) => {
    if (!req.body.email || !req.body.name || !req.body.surname || !req.body.password || !req.body.gender || !req.body.birthDate) {
        res.status(401).send('Missing required data!');
        return;
    }
    if (req.body.password.length < 8) {
        res.status(401).send('Password too short');
        return;
    }
    if (!mailUtils.validatePassword(req.body.password)) {
        res.status(401).send('Invalid password');
        return;
    }
    if (!mailUtils.validateEmail(req.body.email)) {
        res.status(401).send('Invalid email');
        return;
    }
    if (await User.findByEmail(req.body.email)) {
        res.status(401).send('Email alredy taken');
        return;
    }
    let NewUser = new User({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
        gender: req.body.gender,
        birthDate: req.body.birthDate,
        bio: req.body.bio,
        country: req.body.country,
        city: req.body.city,
        favouriteMovie: req.body.favouriteMovie
    })

    mailUtils.sendActivationEmail(NewUser);

    NewUser.encrypt()
    .then(() => {
        NewUser.save();
        res.status(201).send("User created");
    })
    .catch(() => res.status(400).send("Error occurred"));

};

exports.getActivateUser = (req, res, next) => {
    User.findOne({ guid: req.query.guid })
        .then(user => {
            if (!user) {
                res.status(400).json({ success: false, msg: "User not found"});
            }
            user.isVerified = true;
            user.save();
            res.status(200).send("User activated");
        })
};

exports.postAuthenticateUser = (req, res, next) => {
    let { email, password } = req.body;
    User.findByEmail(email)
        .then(user => {
            if (!user) {
                res.status(404).send("User not found");
                return;
            }

            if (!user.isVerified) {
                res.status(404).send("User not verified");
                return;
            }

            user.comparePassword(password)
                .then(result => {
                    if (result) {
                        const token = jwt.sign({ email: user.email, id: user._id }, config.server.secret, { expiresIn: 1000 });
                        res.json({
                            success: true,
                            token: `JWT ${token}`
                        });
                    } else {
                        res.status(401).json({ success: false, msg: "Incorrect password" })
                    }
                })
        })
};

exports.getResetPassword = (req, res, next) => {
    User.findOne({ resetPasswordToken: req.query.token })
        .then(user => {
            if (!user) {
                res.status(400).json({ success: false, msg: "User not found" });
            }
            res.status(200).send("Please copy url and paste it to Postman");
        })
};

exports.postResetPassword = (req, res, next) => {
    User.findByEmail(req.body.email)
        .then(user => {
            if (!user) {
                res.status(400).json({ success: false, msg: "Reset mail sent" });
            }
            
            mailUtils.sendResetPasswordEmail(user);
            user.save();
            res.status(200).json({ success: true, msg: "Reset mail sent" });
        });
};

exports.putResetPassword = (req, res, next) => {
    User.findOne({ resetPasswordToken: req.query.token })
        .then(user => {
            if (!user) {
                res.status(400).json({ success: false, msg: "User not found" });
            }

            if (user.expirationTokenDate < Date.now()) {
                res.status(400).json({ success: false, msg: "Token expired" });
                return;
            }

            user.password = req.body.password;

            user.encrypt()
            .then(() => {
                user.save();
                res.status(201).send("Password changed");
            })
            .catch(() => res.status(400).send("Error occurred"));
                
        })
};