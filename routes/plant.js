const express = require('express');
const router = express.Router();
const Plant = require('../models/plant');

router.get('/', function (req, res, next) {
    console.log('get request');
    Plant.find({}, function (err, result) {
        res.status(201).json({
            status: 'success',
            plants: result
        })
    });
});

router.post('/', function (req, res, next) {
    const plant = new Plant({
        size_id: 1,
        lat: 22.0007661,
        long: 105.8424172,
        current_water: 1,
        in_need_water: 5,
        history_id: ''
        // size_id: req.body.size_id,
        // lat: req.body.lat,
        // long: req.body.long,
        // current_water: req.body.current_water,
        // in_need_water: req.body.in_need_water,
        // history_id: req.body.history_id
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


router.patch('/:id', function (req, res, next) {
    Plant.findById(req.params.id, function (err, plant) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            })
        }
        if (!plant) {
            return res.status(500).json({
                title: 'No plant found',
                error: {message: 'Plant not found'}
            })
        }
        plant.current_water = 3;
        // plant.current_water = req.body.current_water;
        plant.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                })
            }
            res.status(200).json({
                message: 'Updated current_water',
                plant: plant
            })
        });
    })
});


module.exports = router;
