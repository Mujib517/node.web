let User = require('../models/user.model');
let bcrypt = require('bcrypt');

class UserCtrl {

    login(req, res) {
        res.render("pages/login");
    }

    validate(username, password, done) {
        User.findOne({ username: username, password: password })
            .then(function (user) {
                done(null, user);
            })
            .catch(function (err) {
                done(err);
            });
    }

    logout(req, res) {
        req.logout();
        res.redirect("/users/login");
    }
}

module.exports = new UserCtrl();