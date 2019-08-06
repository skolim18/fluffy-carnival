const router = require('express').Router();
const User = require('../models/users');
const config = require('../config');
const uniqid = require('uniqid');
const buildUrl = require('build-url');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { secret } = require('../config/server');

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(pass) {
    var regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
    var validPassword = regExp.test(pass);
    return validPassword;
}

function sendActivationEmail(user) {
    user.guid = uniqid();

    const generatedURL = buildUrl('http://localhost:9090', {
        path: 'activate',
        queryParams: {
            guid: user.guid
        }
    });

    sgMail.setApiKey(config.SENDGRID_API_KEY);
    const msg = {
        to: user.email,
        from: 'activate@test.com',
        subject: 'Activation link',
        text: 'Click to activate your account',
        html: `<a href="${generatedURL}">Click</a> to activate your account`
    };
    sgMail.send(msg);
};


router.post('/register', async (req, res, next) => {
    if (!req.body.email || !req.body.name || !req.body.surname || !req.body.password || !req.body.gender || !req.body.birthDate) {
        res.status(401).send('Missing required data!');
        return;
    }
    if (req.body.password.length < 8) {
        res.status(401).send('Password too short');
        return;
    }
    if (!validatePassword(req.body.password)) {
        res.status(401).send('Invalid password');
        return;
    }
    if (!validateEmail(req.body.email)) {
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
    sendActivationEmail(NewUser);

    NewUser.encrypt()
    .then(() => {
        NewUser.save();
        res.status(201).send("User created");
    })
    .catch(() => res.status(400).send("Error occurred"));

})

router.get('/activate', (req, res, next) => {
    User.findOne({ guid: req.query.guid })
        .then(user => {
            if (!user) {
                res.status(400).json({ success: false, msg: "User not found"});
            }
            user.isVerified = true;
            user.save();
            res.status(200).send("User activated");
        })
})

router.post('/authenticate', (req, res, next) => {
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
})

function sendResetPasswordEmail(user) {
    user.resetPasswordToken = uniqid();

    const generatedURL = buildUrl('http://localhost:9090', {
        path: 'reset',
        queryParams: {
            token: user.resetPasswordToken
        }
    });

    sgMail.setApiKey(config.SENDGRID_API_KEY);
    const msg = {
        to: user.email,
        from: 'reset@test.com',
        subject: 'Reset link',
        text: 'Click to reset your password',
        html: `<a href="${generatedURL}">Click</a> to reset your password`
    };
    sgMail.send(msg);

};


router.post('/reset', (req, res, next) => {
    User.findByEmail(req.body.email)
        .then(user => {
            if (!user) {
                res.status(400).json({ success: false, msg: "User not found" });
            }
            
            sendResetPasswordEmail(user);
            user.save();
            res.status(200).json({ success: true, msg: "Reset mail sent" })
    
        });
})

router.put('/reset', (req, res, next) => {
    User.findOne({ resetPasswordToken: req.query.token })
        .then(user => {
            if (!user) {
                res.status(400).json({ success: false, msg: "User not found" });
            }
            user.password = req.body.password;

            user.encrypt()
            .then(() => {
                user.save();
                res.status(201).send("Password changed");
            })
            .catch(() => res.status(400).send("Error occurred"));
                
        })
})

signToken = user => {
    return jwt.sign({
      iss: 'CodeWorkr',
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, secret);
  }

router.post('/oauth/facebook', passport.authenticate('facebookToken', { session: false }), 
    async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.cookie('access_token', token, {
      httpOnly: true
    });
    res.status(200).json({ success: true });
  })

module.exports = router;