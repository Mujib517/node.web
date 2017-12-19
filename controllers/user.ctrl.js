let User = require('../models/user.model');
let bcrypt = require('bcrypt');

class UserCtrl {

    login(req, res) {
        res.render("pages/login");
    }

    validate(req, res) {
        User.findOne({ username: req.body.username, password: req.body.password })
            .then(function (user) {
                if (user) {
                    res.redirect("/products");
                }
                else {
                    res.locals.failed = true;
                    res.render("pages/login");
                }
            })
            .catch(function (err) {
                console.log(err);
                res.render("pages/error");
            })
    }
}

module.exports = new UserCtrl();