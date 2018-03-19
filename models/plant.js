const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
        size_id: {type: Number, required: true},
        lat: {type: Number, required: true},
        long: {type: Number, required: true},
        current_water_level: {type: Number, required: true},
        max_water_level: {type: Number, required: true},
        history_id: {type: Number, required: false}
    },
    {timestamps: true}
);


module.exports = mongoose.model('Plant', plantSchema);
