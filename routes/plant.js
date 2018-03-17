const express = require('express');
const router = express.Router();
const Plant = require('../models/plant');
const History = require('../models/history');

router.get('/', function (req, res, next) {
    console.log('get request');
    Plant.find({}, function (err, result) {
        res.status(201).json({
            status: 'success',
            plants: result
        })
    });
});

router.get('/test', function (req, res, next) {
    console.log('go')
    return res.status(201).json({
        message: 'success',
    })
});

router.post('/', function (req, res, next) {
    const plant = new Plant({
        size_id: req.body.size_id,
        lat: req.body.lat,
        long: req.body.long,
        current_water: req.body.current_water,
        in_need_water: req.body.in_need_water,
        history_id: req.body.history_id
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


router.patch('/:id', async function (req, res, next) {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) {
            return res.status(422).json({
                title: 'No plant found',
                error: {message: 'Plant not found'}
            })
        }
        plant.current_water = req.body.current_water;
        const plantResult = await plant.save();

        // Update history
        const {user_id, water_level} = req.body;
        const historyResult = await History.update(
            {plant: plant.id},
            {
                $push: {
                    "detail": {
                        user_id: user_id,
                        timestamp: new Date(),
                        water_level: water_level
                    }
                }
            },
            {upsert: true});

        res.send({plantResult, historyResult});
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        })
    }
});

router.get('/history/:id', async function (req, res, next) {
    res.send(await History.findOne({
        plant: req.params.id
    }))
});

module.exports = router;
