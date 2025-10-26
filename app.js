var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const cors = require('cors'); // ← enable CORS for Angular on :4200

// 1) Open DB first so models are registered before controllers/routes load
require('./app_server/models/db');
require('./app_api/models/user'); // ensure User model loads

// 2) THEN require routers
var indexRouter = require('./app_server/routes/index');
var apiRouter   = require('./app_api/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// optional: make {{year}} available to all views
app.use((req, res, next) => { res.locals.year = new Date().getFullYear(); next(); });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allow requests from http://localhost:4200
app.use(cors());

// mount routers
app.use('/', indexRouter);
app.use('/api', apiRouter);

// 404 + error handlers
app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
