const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Dev - logs
const logger = require('morgan');
app.use(logger('dev'));
app.locals.pretty = true;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/app/public/')));
app.set('views', path.join(__dirname, '/app/src/views'));
app.set('view engine', 'ejs');

// Session config
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
app.use(cookieParser());
app.use(session({
	secret: 'dannustan-BlingBlaw',
	proxy: true,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ url: "mongodb://localhost:27017/danustanBling" })
	})
);

// Database config | monk
const mongo = require("mongo");
const monk = require("monk");
const db = monk("localhost:27017/danustanBling")
app.use(function(req,res,next) {
  req.db = db;
  next();
});

// routes
const indexRouter = require('./app/src/index');
const userRouter = require('./app/src/user');
app.use('/', indexRouter);
app.use('/user', userRouter);

const createError = require('http-errors');
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
