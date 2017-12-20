const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const userCtrl = require('../controllers/user.ctrl');
const config = require('../config');

function Auth(app) {
    app.use(session({ secret: config.privateKey, resave: false, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function (username, done) {
        done(null, username);
    });

    passport.use('local-login', new LocalStrategy(function (username, password, done) {
        userCtrl.validate(username, password, done);
    }));
}

module.exports = Auth;