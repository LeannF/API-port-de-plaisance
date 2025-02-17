const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reservation = new Schema( {
    catwayNumber: {
        type: Number,
        trim: true,
        unique: true,
        required: [true, 'Veuillez entrer le numéro de la reservation']
    },
    clientName: {
        type: String,
        trim: true
    },
    boatName: {
        type: String,
        trim: true
    },
    startDate: {
        type: String,
        trim: true,
        match: (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)
    },
    endDate: {
        type: String,
        trim: true,
        match: (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)
    }
})

module.exports = mongoose.model('Reservation', Reservation);