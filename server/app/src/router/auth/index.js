/* Authentication - Router
 * Keep it minimal
 */
const express = require('express');
const router = express.Router();
/*
 * root / 
 */

// React

// POST - Login POST - React
// Authentication - login page
const login = require('./login/login');
router.route('/login').post(login.login);
// POST - Register POST - React
// Authentication - Register page
const register = require('./register/register');
router.route('/register').post(register.register);


// Backend - REST - GUI - EJS
// Home page - Backend
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
