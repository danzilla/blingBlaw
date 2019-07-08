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

// POST -  /user/view
// View user
const viewUser = require('./viewUser');
router.route('/view').post(viewUser.viewUser);

// POST -  /user/add
// Register or Add user
const addUser = require('./addUser');
router.route('/add').post(addUser);

module.exports = router;
