const router = require('express').Router();
const User = require('../models/users');
const config = require('../config');


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(pass) {
    var regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
    var validPassword = regExp.test(pass);
    return validPassword;
}

router.post('/register', (req, res, next) => {
    if (!req.body.email || !req.body.name || !req.body.surname || !req.body.password || !req.body.gender || !req.body.birthDate) {
        res.status(401).send('Missing required data!')
    }
    if (req.body.password.length < 8) {
        res.status(401).send('Password too short')
    }
    if (!validatePassword(req.body.password)) {
        res.status(401).send('Invalid password')
    }
    if (!validateEmail(req.body.email)) {
        res.status(401).send('Invalid email')
    }
    if (User.findByEmail(req.body.email)) {
        res.status(401).send('Email alredy taken')
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
    NewUser.save();
    res.status(201).send('User created!')
})

module.exports = router;