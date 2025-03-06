const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         catwayNumber:
 *           type: integer
 *           example: "1"
 *         clientName:
 *           type: string
 *           example: "John Doe"
 *         boatName:
 *           type: string
 *           example: "Black Pearl"
 *         startDate:
 *           type: string
 *           example: "2024-05-18T06:00:00Z"
 *         endDate:
 *           type: string
 *           example: "2024-09-18T06:00:00Z"
 */
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
