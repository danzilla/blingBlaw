var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var logger = require('morgan');
var mongo = require("mongo");
var monk = require("monk");

var app = express();

app.locals.pretty = true;
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/app/public/')));
app.set('views', path.join(__dirname, '/app/server/views'));
app.set('view engine', 'ejs');

// DB and Session
var dbUrl = "localhost:27017/danustanBling";
var dbname = "";

app.use(cookieParser());

app.use(session({
	secret: 'dannustan-BlingBlaw',
	proxy: true,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ url: "mongodb://localhost:27017/danustanBling" })
	})
);

var db = monk("localhost:27017/danustanBling")
app.use(function(req,res,next){
    req.db = db;
    next();
});

// routes
var indexRouter = require('./app/server/index');
var viewRouter = require('./app/server/view');
var crudRouter = require('./app/server/crud');
app.use('/', indexRouter);
app.use('/view', viewRouter);
app.use('/crud', crudRouter);

var createError = require('http-errors');
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
