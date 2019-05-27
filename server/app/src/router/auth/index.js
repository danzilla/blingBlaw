/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();


// REACT - REST

// POST - Login POST - React
// Authentication - login page
const postLoginReact = require('./login/postLogin');
router.route('/login').post(postLoginReact.postLogin);


// Backend - REST

// Home page - Backend - EJS
// GET login page
const getLogin = require('./authConfig/login');
router.route('/').get(getLogin.login);
// Home page - Auth POST
// POST login page.
const postLogin = require('./authConfig/postLogin');
router.route('/').post(postLogin.postLogin);
// logout All
// POST login page.
const logout = require('./authConfig/logout');
router.route('/logout').all(logout.logOutAll);



module.exports = router;
