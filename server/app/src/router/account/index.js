/* Account - Router
 * Keep it minimal
 */
const express = require('express');
const router = express.Router();

// add New Account /add
const addAccount = require('./addAccount');
router.route('/add').post(addAccount);

// view Accounts /view
const viewAccount = require('./viewAccount');
router.route('/view').post(viewAccount);

module.exports = router;
