/* Authentication - Router
 * Keep it minimal
 */
const express = require('express');
const router = express.Router();

// POST - Login
// Authentication - login page
const login = require('./login');
router.route('/login').post(login.login);
// POST - Register
// Authentication - Register page
const register = require('./register');
router.route('/register').post(register.register);

module.exports = router;
