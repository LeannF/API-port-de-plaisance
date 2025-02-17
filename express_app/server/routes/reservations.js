const express = require('express');
const router = express.Router();

const service = require('../services/reservations');

router.get('/catway/:id/reservations/:idReservation', service.getById);
router.get('/catways/:id/reservations', service.getAllReservations);

router.post('/catways/:id/reservations', service.add);

router.patch('/catways/:id/reservations', service.update);

router.delete('/catway/:id/reservations/:idReservation', service.delete);

module.exports = router;