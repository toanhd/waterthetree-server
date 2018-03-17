const mongoose = require('mongoose');

const waterSourceSchema = new mongoose.Schema({
        lat: {type: Number, required: true},
        long: {type: Number, required: true},
        description: {type: String, required: false}
    }
);

module.exports = mongoose.model('WaterResource', waterSourceSchema);
