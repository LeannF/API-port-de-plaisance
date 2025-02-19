const express = require('express');
const router = express.Router();

const service = require('../services/users');

router.get('/:email', service.getByEmail );
router.get('/', service.getAllUsers);

router.post('/', service.add);

router.patch('/:email', service.update);

router.delete('/:email', service.delete);

module.exports = router;