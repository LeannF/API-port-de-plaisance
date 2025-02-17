const express = require('express');
const router = express.Router();

const service = require('../services/users');

router.get('/:id', service.getById);

router.post('/', service.add);

router.patch('/:id', service.update);

router.delete('/:id', service.delete);

module.exports = router;