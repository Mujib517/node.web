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
    layoutDir: __dirname + "/views/pages"
}));

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

mongoose.connection.openUri(config.conStr);
mongoose.Promise = global.Promise;

const defaultRouter = require('./routes/default.router');
const productRouter = require('./routes/product.router');

app.use('/', defaultRouter);
app.use('/products', productRouter);