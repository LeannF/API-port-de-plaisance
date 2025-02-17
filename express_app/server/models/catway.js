const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catway = new Schema( {
    catwayNumber: {
        type: Number,
        trim: true,
    },
    catwayType: {
        type: String,
        trim: true
    },
    catwayState: {
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('Catway', Catway)