const express = require('express');
const router = express.Router();
const connexion = require('../services/auth');
const private = require('../middlewares/private')


router.post('/login', private.checkJWT, connexion.login);
router.get('/logout', connexion.logout);

module.exports = router;