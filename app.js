const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const bodyparser = require('body-parser');
const UserRoutes = require('./routers/users');
const PostRoutes = require('./routers/posts');
const FriendsRoutes = require('./routers/friends');
const User = require('./models/users');
const Post = require('./models/posts');

const app = express();
app.use(bodyparser.json());
app.use(passport.initialize());

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: config.server.secret
};

const successHandler = (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
            if (!user) {
                done(null, false);
                return;
            }

            done(null, user);
        })
}

passport.use(new Strategy(opts, successHandler));

app.use(UserRoutes);
app.use(FriendsRoutes);
app.use(PostRoutes);

app.get('/secret', passport.authenticate('jwt', { session: false }), (req, res, next) => res.send('Secret hello'));

mongoose
    .connect(config.database.url, config.database.options)
    .then(() => app.listen(config.server.port))
    .then(() =>
    User.create( {
        email: "admin@fluffyadmin.com",
        isVerified: true,
        password: "Admin123!",
        role: "Admin",
        name: "Admin",
        surname: "Adminadmin",
        gender: "other",
        birthDate: 1970-01-01
    }))
    .catch(err => console.log(err));    