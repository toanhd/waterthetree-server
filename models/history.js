const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    plant: {type: Schema.Types.ObjectId, ref: 'Plant'},
    detail: [
        {
            user_id: {type: Schema.Types.ObjectId, ref: 'User'},
            timestamp: Date,
            water_level: Number
        }
    ]
});

module.exports = mongoose.model('History', historySchema);
