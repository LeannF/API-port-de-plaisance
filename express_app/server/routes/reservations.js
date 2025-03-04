const express = require('express');
const router = express.Router();

const service = require('../services/reservations');

router.get('/catways/:id/reservations/:idReservation', service.getByCatwayNumber);

router.get('/catways/:id/reservations', service.getAllReservationsBycatwayNumber );

router.post('/catways/:id/reservations', service.add);

router.patch('/catways/:id/reservations', service.update);

router.delete('/catways/:id/reservations/:idReservation', service.delete);

module.exports = router;