const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private')


router.get('/:email', private.checkJWT, service.getByEmail );
router.get('/', private.checkJWT, service.getAllUsers);

router.post('/', private.checkJWT, service.add);

router.patch('/:email', private.checkJWT, service.update);

router.delete('/:email', private.checkJWT, service.delete);

router.post('/authenticate', service.authenticate)

module.exports = router;