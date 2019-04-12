// App - Danzilla inc.
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
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', path.join(__dirname, '/view/render/'));
app.set('view engine', 'ejs');

// Session - Express-session
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({
  secret: 'Danzilla-Rawr',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

// Cors - Cross-Origin Resource Sharing
const cors = require('cors')
app.use(cors());

// Flash message
const flash = require('express-flash');
app.use(flash());

// Routes - API
const indexRouter = require('./src/router/auth/index');
const userRouter = require('./src/router/users/users');
const categoryRouter = require('./src/router/category/category');
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/category', categoryRouter);

// Error catch
const createError = require('http-errors');
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
