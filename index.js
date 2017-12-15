const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server running on ${port}`);
});

app.get('/', function (req, res) {
    res.send("Hello Node");
});