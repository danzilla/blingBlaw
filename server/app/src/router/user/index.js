/* Users - Router
 * Keep it minimal
 */
const express = require('express');
const router = express.Router();

// User
// View user
    // view_ALL
// Add user
// Update user
// Remove user
// Auth user


// POST -  /user/add
// Register or Add user
const addUser = require('./addUser');
router.route('/add').post(addUser);

// POST - /user/login
const loginUser = require('./loginUser');
router.route('/login').post(loginUser);

module.exports = router;
