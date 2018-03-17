const express = require('express');
const router = express.Router();
const WaterSource = require('../models/water-resource');


router.post('/', function (req, res, next) {
    const {lat, long, description} = req.body;
    const waterSource = new WaterSource({
        lat, long, description
    });
    waterSource.save(function (err, waterrsc) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            })
        }
        res.status(201).json({
            message: 'water resource created',
            water_resource: waterrsc
        })
    })
});

router.get('/', function (req, res, next) {
    WaterSource.find({}, function (err, waterrsc) {
        res.status(200).json({
            status: 'success',
            water_resource: waterrsc
        })
    });
});

module.exports = router;
