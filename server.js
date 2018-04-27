// const express = require('express');
const app = require('express')();
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const appRoutes = require('./routes/default');
const plantRoutes = require('./routes/plant');
const authentRoutes = require('./routes/authentication');
const waterRoutes = require('./routes/water-resource');


require('console-stamp')(console, '[HH:MM:ss.l]');

mongoose.connect('mongodb://localhost:27017/waterthetree');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/plant', plantRoutes);
app.use('/authentication', authentRoutes);
app.use('/water-resource', waterRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     console.log('catch 404');
// });

module.exports = app;