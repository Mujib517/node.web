const express = require('express');
const hbs = require('express-hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const config = require('./config');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("lib"));
app.set('view engine', 'hbs');
//app.set('views', 'views');
app.engine('hbs', hbs.express4({
    defaultLayout: __dirname + "/views/index.hbs",
    layoutDir: __dirname + "/views/pages",
    partialsDir: __dirname + "/views/"
}));

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

mongoose.connection.openUri(config.conStr);
mongoose.Promise = global.Promise;


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({ secret: config.privateKey }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    console.log('serializatioon', user);
    done(null, user.username);
});

passport.deserializeUser(function (username, done) {
    done(null);
});

passport.use('local-login', new LocalStrategy(function (username, password, done) {
    if (username == 'admin' && password == 'admin') return done(null, { username: username });
    else done("Wrong username or password");
}));

app.post('/users/login', passport.authenticate('local-login', {
    successRedirect: '/products',
    failureRedirect: '/users/login'
}));

const defaultRouter = require('./routes/default.router');
const productRouter = require('./routes/product.router');
const userRouter = require('./routes/user.router');

app.use('/', defaultRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);