const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const port = 3000;
const mongoose = require('mongoose');

const plantRoutes = require('./routes/plant');

mongoose.connect('mongodb://localhost:27017/waterthetree');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/plant', plantRoutes);

server.listen(port, function () {
    console.log('Listening on port ' + port + '!');
});

