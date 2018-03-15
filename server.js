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

app.get('/plant', function (req, res, next) {
    const plant = new Plant({
        size_id: 3,
        lat: 21.0007661,
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

// app.post('/plant/:id', function (req, res, next) {
//     console.log("day la post");
//     const msg = new Plant({
//         content: "noi dung"
//     });
//
//     msg.save(function (err, result) {
//         if (err) {
//             res.status(500).json({
//                 message: 'Error',
//                 error: err
//             });
//         }
//         else {
//             res.status(201).json({
//                 message: 'saved',
//                 result: result
//             });
//         }
//     })
// });

server.listen(port, function () {
    console.log('Listening on port ' + port + '!');
});

