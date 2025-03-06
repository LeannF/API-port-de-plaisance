const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt= require('bcrypt');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "johndoe@gmail.com"
 *         password:
 *           type: string
 *           example: john&Do3
 */
const User = new Schema(    {
    userName: {
        type: String,
        trim: true,
        unique: true,
        minlenght: 3,
        required: [true, "Veuillez entrer votre nom"],
        match: /^[a-zA-Z0-9_-]+$/
    }, 
    email: {
        type: String,
        trim: true,
        required: [true, "Veuillez entrer votre mail"],
        unique: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        trim: true,
        minlength: 8,
        validate: {
            validator: function (value) {
            return /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/.test(value);
            },
            message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
        }
    }
})

/** hash le mdp*/
User.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model('User', User);