// App - BlingBlaw - Danzilla
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Dev - logs
const logger = require('morgan');
app.use(logger('dev'));
app.locals.pretty = true;

// Beauty
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/view/'));

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

// Routes - API
const firstrun = require('./src/router/firstrun');
const userRouter = require('./src/router/user');
const fannyPack = require('./src/router/fannyPack');
const account = require('./src/router/account');

app.use('/firstrun', firstrun); // Firstrun - /firstrun
app.use('/user', userRouter); // user - /user
app.use('/fannypack', fannyPack); // fannyPack - /fannypack
app.use('/account', account); // account - /account

// Wicked
module.exports = app;
