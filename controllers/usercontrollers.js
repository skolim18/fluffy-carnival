const config = require('../config');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Post = require('../models/posts');
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
                            auth: true,
                            token: `${token}`
                        });
                    } else {
                        res.status(401).json({ auth: false, token: null, msg: "Incorrect password" })
                    }
                })
        })
};

exports.getLogoutUser = (req, res) => {
    res.status(200).send({ auth: false, token: null });
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
                res.status(400).json({ success: false, msg: "User not found" });
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

exports.getFindCurrentUser = (req, res, next) => {
    User.findById(req.id, { password: 0 }, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      

    Post.find({authorId: req.id})
        .then(post => {
            if (!post) {
                res.status(400).json({ success: false, msg: "Posts not found"});
            }                
        res.status(200).send({user: user, posts: post});   
        });
    
    });
    
  };

exports.patchUpdateUser = (req, res, next) => {
    User.findByIdAndUpdate(req.id, {
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        gender: req.body.gender,
        birthDate: req.body.birthDate,
        bio: req.body.bio,
        country: req.body.country,
        city: req.body.city,
        favouriteMovie: req.body.favouriteMovie
    })
        .then(user => {
            if (!user) {
                res.status(400).json({ success: false, msg: "User not found" });
                return;
            }
            user.save();
            res.status(200).json({ success: true, msg: "Profile updated" });
            return;
        })
}

exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.id })
        .then(foundUser => {
            if (foundUser.role === "User") {
                User.findOne({ _id: req.id })
                    .then(user => {
                        if (!user) {
                            res.status(400).json({ success: false, msg: "User not found" });
                        }
                        user.remove();
                        res.status(200).send("User removed!");
                    })
            }
            else if (foundUser.role === "Admin") {
                User.findOne({ _id: req.body.id })
                    .then(user => {
                        if (!user) {
                            res.status(400).json({ success: false, msg: "User not found" });
                        }
                        user.remove();
                        res.status(200).send("User removed by Admin!");
                    })
            }
        });
};

exports.getFindUsers = (req, res, next) => {
    User.find({$and: [{visibility: "visible"}, {$or:[{email: req.body.email},{name: req.body.name},{surname: req.body.surname}]}]})
        .then(user => {
            if (!user) {
                res.status(400).json({ success: false, msg: "Users matching criteria not found"});
            } 
            res.send(user);
        })
}

exports.putChangeVisibility = (req, res, next) => {
    User.findById(req.id)
        .then(user => {
            if (!user) {
                res.status(400).json({ success: false, msg: "User not found" });
            }

            user.visibility = req.body.visibility;
            user.save();

            res.status(200).json({ success: true, msg: "Visibility changed!" });
                
        })
};