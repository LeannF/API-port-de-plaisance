var express = require('express');
var router = express.Router();

const private = require('../middlewares/private')
const userRoute = require('./users');

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('accueil', {
    title: 'Page de connexion'
  })
});

router.get('/board', private.isAuthenticated,  async (req, res) => {
  console.log("📌 Session actuelle:", req.session);
  res.render('board',  {
    user: req.session.user,
    title: 'Tableau de bord'
  })
});

router.get('/user', async (req, res) => {
  res.render('users', {
    title: 'Page des Utilisateurs'
  })
});

router.get('/catways', async (req, res) => {
  res.render('catways', {
    title: 'Page des Catways'
  })
});

router.get('/reservations', async (req, res) => {
  res.render('reservations', {
    title: 'Page des réservations'
  })
});

router.get('/doc', async (req, res) => {
  res.render('doc', {
    title: 'Documentation API'
  })
});

router.use('/users', userRoute);

module.exports = router;
