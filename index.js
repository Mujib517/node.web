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

const auth = require('./utilities/auth');

auth(app);

const defaultRouter = require('./routes/default.router');
const productRouter = require('./routes/product.router');
const userRouter = require('./routes/user.router');

app.use('/', defaultRouter);
app.use('/users', userRouter);

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) next();
    else res.redirect("/users/login");
}

function attachAuthInfo(req, res, next) {
    res.locals.authenticated = true;
    next();
}


function noCache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
}

app.use(isAuthenticated);
app.use(attachAuthInfo);
app.use(noCache);


app.use('/products', productRouter);
