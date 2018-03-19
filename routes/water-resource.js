const express = require('express');
const router = express.Router();
const WaterSource = require('../models/water-resource');


router.post('/', function (req, res, next) {
    const {lat, long, description} = req.body;
    const waterSource = new WaterSource({lat, long, description});
    waterSource.save(function (err, waterrsc) {
        if (err) {
            console.log('An error occurred');
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            })
        }
        console.log('water resource created');
        res.status(201).json({
            message: 'water resource created',
            water_resource: waterrsc
        })
    })
});

// get all water resource
router.get('/', function (req, res, next) {
    WaterSource.find({}, function (err, waterrsc) {
        console.log('success get all water resource');
        res.status(200).json({
            status: 'success',
            water_resource: waterrsc
        })
    });
});

module.exports = router;
