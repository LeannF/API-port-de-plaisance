var express = require('express');
var router = express.Router();

const private = require('../middlewares/private');
const Reservation = require('../models/reservation');
const Catway = require('../models/catway');
const User = require('../models/user');

const userRoute = require('./users');


/* GET home page. */
router.get('/', async (req, res) => {
  res.render('accueil', {
    title: 'Page de connexion'
  })
});

router.get('/board', private.isAuthenticated,   async (req, res) => {
  const reservations = await Reservation.find().lean(); 
  const today = new Date(); // Date du jour

  res.render('board', {
    user: req.session.user,
    title: 'Tableau de bord',
    reservations: reservations || [],
    today: today.toLocaleDateString()
  })
});

router.get('/users', async (req, res) => {
  const users = await User.find().lean();
  const id = req.params.email;

  res.render('users', {
    title: 'Page des Utilisateurs',
    users: users || [],
    email: id
  })
});

router.get('/catways', async (req, res) => {
  const catways = await Catway.find().lean();
  const id = req.params.id;

  res.render('catways', {
    title: 'Page des Catways',
    catways: catways || [],
    catwayNumber: id,
  })
});

router.get('/reservations', async (req, res) => {
  const reservations = await Reservation.find().lean(); 
  const id = req.params.id;
  const _id = req.params.idReservation;

  res.render('reservations', {
    title: 'Page des réservations',
    reservations: reservations || [],
    catwayNumber: id,
    idReservation: _id
  })
});

router.get('/doc', private.isAuthenticated, async (req, res) => {
  res.render('doc', {
    title: 'Documentation API'
  })
});

router.use('/users', userRoute);

module.exports = router;
