const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const port = 3000;
const mongoose = require('mongoose');
const Plant = require('./models/plant');

mongoose.connect('mongodb://localhost:27017/waterthetree');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/plant', function (req, res, next) {
    const plant = new Plant({
        size_id: 1,
        lat: 22.0007661,
        long: 105.8424172,
        current_water: 1,
        in_need_water: 5,
        history_id: ''
    });
    plant.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            })
        }
        res.status(201).json({
            message: 'plant created',
            obj: result
        })
    })
});

app.get('/plant', function (req, res, next) {
    Plant.find({}, function (err, result) {
        res.status(201).json({
            message: 'success',
            obj: result
        })
    });
});


server.listen(port, function () {
    console.log('Listening on port ' + port + '!');
});

