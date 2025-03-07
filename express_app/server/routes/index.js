var express = require('express');
var router = express.Router();

const auth = require('../middlewares/auth');
const Reservation = require('../models/reservation');
const Catway = require('../models/catway');
const User = require('../models/user');
const fs = require("fs");
const path = require('path');

/**
 * @lean returns a javascript object
 * @get récupère les pages nécessaires pour le site
 * @render rend la vue correspondante
 * @isAuthenticated vérifie si l'utilateur est connecté 
 */

router.get('/', async (req, res) => {
  res.render('accueil', {
    title: 'Page de connexion'
  })
});

router.get("/debug-files", (req, res) => {
  const viewsPath = path.join(__dirname, "../views"); // Ajuste le chemin si besoin
  fs.readdir(viewsPath, (err, files) => {
    if (err) {
      return res.status(500).send("Erreur de lecture du dossier views: " + err);
    }
    res.send("Fichiers dans views: " + files.join(", "));
  });
});

router.get('/board', auth.isAuthenticated,   async (req, res) => {
  const reservations = await Reservation.find().lean(); 
  const today = new Date();

  res.render('board', {
    user: req.session.user,
    title: 'Tableau de bord',
    reservations: reservations || [],
    today: today.toLocaleDateString()
  })
});

router.get('/users', auth.isAuthenticated, async (req, res) => {
  const users = await User.find().lean();
  const id = req.params.email;

  res.render('users', {
    title: 'Page des Utilisateurs',
    users: users || [],
    email: id
  })
});

router.get('/catways', auth.isAuthenticated, async (req, res) => {
  const catways = await Catway.find().lean();
  const id = req.params.id;
  console.log("Rendering catways view");

  res.render('catways', {
    title: 'Page des Catways',
    catways: catways || [],
    catwayNumber: id,
  })
});

router.get('/reservations', auth.isAuthenticated, async (req, res) => {
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

router.get('/doc', auth.isAuthenticated, async (req, res) => {
  res.render('doc', {
    title: 'Documentation API'
  })
});

module.exports = router;