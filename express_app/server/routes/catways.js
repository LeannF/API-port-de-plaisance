const express = require('express');
const router = express.Router();

const service = require('../services/catways');

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupère le catway recherché 
 *     description: Renvoie le catway recherché.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id du catway à rechercher, correspondant au numéro du catwawy
 *     responses:
 *       200:
 *         description:  Succès - Renvoie le catway
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   catwayNumber:
 *                     type: integer
 *                   catwayType:
 *                     type: string
 *                   catwayState:
 *                     type: string
 */
router.get('/:id', service.getById);

/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Récupère tous les catways
 *     description: Renvoie une liste de tous les catways enregistrés.
 *     responses:
 *       200:
 *         description: Liste des catways
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', service.getAllCatways);

/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Ajouter un catway
 *     description: Ajoute un nouveau catway à la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: integer
 *                 example: "3"
 *               catwayType:
 *                 type: string
 *                 example: "long"
 *               catwayState:
 *                 type: string
 *                 example: "bon état"
 *     responses:
 *       201:
 *         description: Catway ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 catwayNumber:
 *                   type: integer
 *                 catwayType:
 *                   type: string
 *                 catwayState:
 *                   type: string
 */
router.post('/', service.add);

/**
 * @swagger
 * /catway/{id}:
 *   patch:
 *     summary: Met à jour partiellement un catway
 *     description: Permet de modifier l'état d'un catway.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id du catway, correspondant au numéro du catway, à supprimer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayState:
 *                 type: string
 *                 example: "Nouvel état du catway"
 *     responses:
 *       200:
 *         description: Catway mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 catwayNumber:
 *                   type: integer
 *                 catwayType:
 *                   type: string
 *                 catwayState:
 *                   type: string 
 *       400:
 *         description: Requête invalide (données manquantes ou incorrectes)
 *       404:
 *         description: Catway non trouvé
 */
router.patch('/:id', service.update);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprimer un catway
 *     description: Supprime un catway en fonction de son id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id du catway, correspondant au numéro du catway, à supprimer
 *     responses:
 *       200:
 *         description: Catway supprimé avec succès
 *       404:
 *         description: Catway non trouvé
 */
router.delete('/:id', service.delete);

module.exports = router;