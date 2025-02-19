const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catway = new Schema( {
    catwayNumber: {
        type: Number,
        trim: true,
        require: [true, "Veuillez mettre le numéro du catway"],
        unique: true
    },
    catwayType: {
        type: String,
        enum: ['long', 'short', "Long", "Short"],
        trim: true,
        require: true
    },
    catwayState: {
        type: String,
        trim: true,
        require: true
    }
})

module.exports = mongoose.model('Catway', Catway)