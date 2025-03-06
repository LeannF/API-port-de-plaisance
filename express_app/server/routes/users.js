const express = require('express');
const router = express.Router();

const service = require('../services/users');

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Récupère l'utilisateur recherché 
 *     description: Renvoie l'utilisateur recherché.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: integer
 *         description: Email de l'utilisateur à rechercher
 *     responses:
 *       200:
 *         description:  Succès - Renvoie l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   userName:
 *                     type: string
 */
router.get('/:email', service.getByEmail );

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     description: Renvoie une liste de tous les utilisateurs enregistrés.
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', service.getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Ajouter un utilisateur
 *     description: Ajoute un nouvel utilisateur à la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "Johndoe@gmail.com"
 *               password:
 *                 type: string
 *                 example: "John&do3"
 *     responses:
 *       201:
 *         description: Utilisateur ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 userName:
 *                   type: string
 */
router.post('/', service.add);

/**
 * @swagger
 * /users/{email}:
 *   patch:
 *     summary: Met à jour partiellement un utilisateur
 *     description: Permet de modifier certaines informations d'un utilisateur.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: integer
 *         description: Entrer un nouvel email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: "Nouveau Nom"
 *               email:
 *                 type: string
 *                 example: "Nouvel email"
 *               password:
 *                 type: string
 *                 example: "Nouveau mot de passe"
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 password:
 *                   type: string 
 *       400:
 *         description: Requête invalide (données manquantes ou incorrectes)
 *       404:
 *         description: Utilisateur non trouvé
 */
router.patch('/:email', service.update);

/**
 * @swagger
 * /users/{email}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Supprime un utilisateur en fonction de son email.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: integer
 *         description: Email de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete('/:email', service.delete);

module.exports = router;