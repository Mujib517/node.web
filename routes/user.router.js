const express = require('express');
const router = express.Router();
const passport = require('passport');
const userCtrl = require('../controllers/user.ctrl');

router.get('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/products',
    failureRedirect: '/users/login'
}));

module.exports = router;