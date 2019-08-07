// User - Router
const express = require('express');
const router = express.Router();

// Add user
const addUser = require('./addUser');
router.route('/add').post(addUser);
// Login user
const loginUser = require('./loginUser');
router.route('/login').post(loginUser);

module.exports = router;
