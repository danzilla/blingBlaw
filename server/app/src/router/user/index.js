// User - Router
const express = require('express');
const router = express.Router();


// Login user
const loginUser = require('./loginUser');
router.route('/login').post(loginUser);
// Add user
const addUser = require('./addUser');
router.route('/add').post(addUser);
// View user
const viewUser = require('./viewUser');
router.route('/view').post(viewUser);
// View all user
const viewAllUser = require('./viewAllUser');
router.route('/view/all').post(viewAllUser);

module.exports = router;
