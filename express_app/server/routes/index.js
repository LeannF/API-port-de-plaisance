var express = require('express');
var router = express.Router();

const userRoute = require('./users');
const reservationsRouter = require('./reservations');
const catwaysRouter = require('./catways');
const { version } = require('mongoose');

/* GET home page. */
router.get('/', async (req, res) => {
  res.status(200).json({
    name      :process.env.APP_NAME,
    version   :'1.0',
    status    :200, 
    message   :"Bienvenue sur l'API" 
  });
});

router.use('/users', userRoute);
router.use('/reservations', reservationsRouter);
router.use('/catways', catwaysRouter);

module.exports = router;
