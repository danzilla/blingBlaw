// Express
var express = require('express');
var app = express();

// CURD db connection - router // Improve
var mongo = require("mongo");
var monk = require("monk");
var db = monk("localhost:27017/express-hello")
app.use(function(req,res,next){
    req.db = db;
    next();
});
console.log("DB Connection good! Express-hello");  //Improve

var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var logger = require('morgan');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
	secret: 'session-secret',
	proxy: true,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ url: "mongodb://localhost:27017/express-hello" })
	})
);
console.log("Session good!"); //Improve

// routes
var indexRouter = require('./routes/index');
var viewRouter = require('./routes/view');
var crudRouter = require('./routes/crud');
var authRouter = require('./routes/modules/auth');
app.use('/', indexRouter);
app.use('/view', viewRouter);
app.use('/crud', crudRouter);
app.use('/auth', authRouter);

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
