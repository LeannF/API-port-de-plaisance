const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private')


router.get('/:email', service.getByEmail );
router.get('/', service.getAllUsers);

router.post('/', service.add);

router.patch('/:email', service.update);

router.delete('/:email', service.delete);

//router.post('/authenticate', service.authenticate)

module.exports = router;