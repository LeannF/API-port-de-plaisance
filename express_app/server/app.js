const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const reservationsRouter = require('./routes/reservations');
const catwaysRouter = require('./routes/catways');
const authRouter = require('./routes/auth');

const mongodb = require('./db/mongo');

mongodb.initClientDbConnection();

const app = express();

app.use(cors({
  exposedHeaders: ['Authorization'],
  origin: ''
}));

// view engine setup
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

app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  res.status(404).json({ name: 'PDP', version: '1.0', status: 404, message: 'not_found' });
});

module.exports = app;