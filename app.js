const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const FacebookTokenStrategy = require('passport-facebook-token');

const bodyparser = require('body-parser');
const UserRoutes = require('./routers/users');
const User = require('./models/users');


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

app.get('/secret', passport.authenticate('jwt', { session: false }), (req, res, next) => res.send('Secret hello'));

passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: config.server.clientID,
    clientSecret: config.server.clientSecret,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile);
    console.log('accessToken', accessToken);

    if (req.user) {
      // We're already logged in, time for linking account!
      // Add Facebook's data to an existing account
      req.user.methods.push('facebook')
      req.user.facebook = {
        id: profile.id,
        email: profile.emails[0].value,
        name: profile.name.givenName,
        surname: profile.name.middleName,
        gender: profile.gender,
        birthDate: profile.birthDate,
      }
      await req.user.save();
      return done(null, req.user);
    } else {
      // We're in the account creation process
      let existingUser = await User.findOne({ "facebook.id": profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      // Check if we have someone with the same email
      existingUser = await User.findOne({ "local.email": profile.emails[0].value })
      if (existingUser) {
        // We want to merge facebook's data with local auth
        existingUser.methods.push('facebook')
        existingUser.facebook = {
          id: profile.id,
          email: profile.emails[0].value,
          name: profile.name.givenName,
          surname: profile.name.middleName,
          gender: profile.gender,
          birthDate: profile.birthDate,
        }
        await existingUser.save()
        return done(null, existingUser);
      }

      const newUser = new User({
        methods: 'facebook',
        facebook: {
          id: profile.id,
          email: profile.emails[0].value,
          name: profile.name.givenName,
          surname: profile.name.middleName,
          gender: profile.gender,
          birthDate: profile.birthDate,
        }
      });

      await newUser.save();
      done(null, newUser);
    }
  } catch(error) {
    done(error, false, error.message);
  }
}));

mongoose
    .connect(config.database.url, config.database.options)
    .then(() => app.listen(config.server.port))
    .catch(err => console.log(err))    
