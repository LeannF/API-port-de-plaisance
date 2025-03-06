const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const session = require('express-session');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const reservationsRouter = require('./routes/reservations');
const catwaysRouter = require('./routes/catways');
const authRouter = require('./routes/auth');

require('dotenv').config({ path: './env/.env' });

const mongodb = require('./db/mongo');
const { models } = require('mongoose');

mongodb.initClientDbConnection();

const app = express();

/**
 * @secret Clé secrète pour signer les sessions
 * @resave Ne sauvegarde pas si aucune modification
 * @saveUninitialized Sauvegarde une session même vide
 * @cookie autorise les cookie en http
 */

app.use(session({
  secret: 'monSuperSecret', 
  resave: false, 
  saveUninitialized: true, 
  cookie: { secure: false } 
}));

app.use(cors({
  exposedHeaders: ['Authorization'],
  origin: ''
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));

/** Utiliser body-parser pour parser les données du formulaire */ 
app.use(bodyParser.urlencoded({ extended: true }));

/** view engine setup */ 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', reservationsRouter);
app.use('/catways', catwaysRouter);
app.use('/', authRouter);

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

/** Définition des options Swagger */ 
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Port de Plaisance",
      version: "1.0.0",
      description: "Documentation de l'API avec Swagger",
    },
  },
  /** // Chemin vers les fichiers de route */
  apis: [
    "./server/routes/*.js",
    "./server/models/*.js"
  ],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


app.use(function(req, res, next) {
  res.status(404).json({ name: 'PDP', version: '1.0', status: 404, message: 'not_found' });
});

module.exports = app;