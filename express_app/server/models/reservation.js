const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    catwayNumber: {
        type: Number,
        trim: true,
        required: [true, 'Veuillez entrer le numéro du catway'],
    },
    clientName: {
        type: String,
        trim: true,
        required: [true, 'Veuillez entrer le nom du client']
    },
    boatName: {
        type: String,
        trim: true,
        required: [true, 'Veuillez entrer le nom du bateau']
    },
    startDate: {
        type: String,
        required: [true, 'Veuillez entrer la date de début']
    },
    endDate: {
        type: String,
        required: [true, 'Veuillez entrer la date de fin']
    }
})

module.exports = mongoose.model('Reservation', ReservationSchema);
