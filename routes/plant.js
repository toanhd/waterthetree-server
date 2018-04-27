const express = require('express');
const router = express.Router();
const Plant = require('../models/plant');
const History = require('../models/history');

// get all plants
router.get('/', function (req, res, next) {
    console.log('success get all plants');
    Plant.find({}, function (err, result) {
        res.status(200).json({
            status: 'success',
            plants: result
        })
    });
});

// create plant
router.post('/', function (req, res, next) {
    const plant = new Plant({
        size_id: req.body.size_id,
        lat: req.body.lat,
        long: req.body.long,
        current_water_level: req.body.current_water_level,
        max_water_level: req.body.max_water_level,
        history_id: req.body.history_id
    });
    plant.save(function (err, result) {
        if (err) {
            console.log('An error occurred');
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            })
        }
        console.log('plant created');
        res.status(201).json({
            message: 'plant created',
            obj: result
        })
    })
});

// up date current_water_level
router.patch('/', async function (req, res, next) {
    try {
        const plant = await Plant.findById(req.body.plant_id);
        if (!plant) {
            console.log('No plant found');
            return res.status(404).json({
                success:0,
                title: 'No plant found',
                error: {message: 'Plant not found'}
            })
        }
        plant.current_water_level = req.body.current_water_level;
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
        res.send({
            success:1,
            plantResult: plantResult
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success:0,
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
