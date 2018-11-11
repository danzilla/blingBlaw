/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

// Home page
// GET login page
const getLogin = require('./authConfig/getLogin');
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
