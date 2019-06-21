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

// initiate Data base /user/
const viewUser = require('./viewUser');
router.route('/view').post(viewUser.viewUser);

module.exports = router;
