const express = require('express');
const router = express.Router();

const service = require('../services/reservations');

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   get:
 *     summary: Récupère la réservation recherchée 
 *     description: Renvoie la réservation recherché.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id correspondant au numéro du catway de la réservation à rechercher
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: integer
 *         description: id de la résevation à rechercher
 *     responses:
 *       200:
 *         description:  Succès - Renvoie la réservation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   catwayNumber:
 *                     type: integer
 *                   clientName:
 *                     type: string
 *                   boatName:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                   endDate:
 *                     type: string
 */
router.get('/catways/:id/reservations/:idReservation', service.getByCatwayNumber);

/**
 * @swagger
 * /catways/{id}/reservations:
 *   get:
 *     summary: Récupère toutes les réservations recherchées du catway indiqué 
 *     description: Renvoie les réservation recherchées.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id correspondant au numéro du catway des réservations à rechercher
 *     responses:
 *       200:
 *         description:  Succès - Renvoie les réservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   catwayNumber:
 *                     type: integer
 *                   clientName:
 *                     type: string
 *                   boatName:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                   endDate:
 *                     type: string
 */
router.get('/catways/:id/reservations', service.getAllReservationsBycatwayNumber );

/**
 * @swagger
 * /catways/{id}/reservations:
 *   post:
 *     summary: Ajoute la réservation au catway indiqué 
 *     description: Ajoute la réservation.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id correspondant au numéro du catway de la réservation à ajouter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                  type: integer
 *                  example: "3"
 *               clientName:
 *                  type: string
 *                  example: "John Doe"
 *               boatName:
 *                  type: string
 *                  example: "Black Pearl"
 *               startDate:
 *                  type: string
 *                  example: "2024-05-18T06:00:00Z	"
 *               endDate:
 *                  type: string
 *                  example: "2024-11-30T06:00:00Z"
 *     responses:
 *       200:
 *         description: Succès - Ajout de la réservation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   catwayNumber:
 *                     type: integer
 *                   clientName:
 *                     type: string
 *                   boatName:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                   endDate:
 *                     type: string
 */
router.post('/catways/:id/reservations', service.add);

/**
 * @swagger
 * /catways/{id}/reservations:
 *   patch:
 *     summary: Met à jour partiellement une réservation
 *     description: Permet de modifier certaines informations d'une réservation.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *         description: id, correspondant au numéro du catway, à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: integer
 *                 example: "Nouveau numero de catway"
 *               clientName:
 *                 type: string
 *                 example: "Nouveau nom de client"
 *               boatName:
 *                 type: string
 *                 example: "Nouveau nom de bateau"
 *               startDate:
 *                  type: string
 *                  exmaple: "Nouvelle date de début"
 *               endDate:
 *                  type: string
 *                  exmaple: "Nouvelle date de fin"
 *     responses:
 *       200:
 *         description: Réservation mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   catwayNumber:
 *                     type: integer
 *                   clientName:
 *                     type: string
 *                   boatName:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                   endDate:
 *                     type: string
 *       400:
 *         description: Requête invalide (données manquantes ou incorrectes)
 *       404:
 *         description: Réservation non trouvée
 */
router.patch('/catways/:id/reservations', service.update);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   delete:
 *     summary: Supprimer une réservation
 *     description: Supprime la réservation d'un catway en fonction de son id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id du catway de la réservation
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: integer
 *         description: id de la réservation à supprimer
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès
 *       404:
 *         description: Réservation non trouvée
 */
router.delete('/catways/:id/reservations/:idReservation', service.delete);

module.exports = router;