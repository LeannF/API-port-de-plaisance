const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Catway:
 *       type: object
 *       properties:
 *         catwayNumber:
 *           type: integer
 *           example: "1"
 *         catwayType:
 *           type: string
 *           example: "short"
 *         catwayState:
 *           type: string
 *           example: "bon état"
 */
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