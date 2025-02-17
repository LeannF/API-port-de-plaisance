const express = require('express');
const router = express.Router();

const service = require('../services/catways');

router.get('/:id', service.getById);
router.get('/', service.getAllCatways);

router.post('/', service.add);

router.patch('/:id', service.update);

router.delete('/:id', service.delete);

module.exports = router;