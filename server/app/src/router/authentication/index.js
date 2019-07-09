/* Authentication - Router
 * Keep it minimal
 */
const express = require('express');
const router = express.Router();

// POST - Login
// Authentication - login page
const login = require('./login');
router.route('/login').post(login);

module.exports = router;
