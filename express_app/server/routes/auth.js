const express = require('express');
const router = express.Router();
const connexion = require('../services/auth');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     description: Connecte un utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "Johndoe@gmail.com"
 *               password:
 *                 type: string
 *                 example: "John&do3"
 *     responses:
 *       201:
 *         description: Utilisateur connecté avec succès
 */
router.post('/login', connexion.login) ;

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Déconnecter l'utilisateur connecté
 *     description: Déconnecte l'utilisateur connecté.
 *     responses:
 *       200:
 *         description:  Succès - Déconnexion
 */
router.get('/logout', connexion.logout);

module.exports = router;