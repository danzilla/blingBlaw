/* Firstrun - Router
 * Keep it minimal
 */
const express = require('express');
const router = express.Router();

// initiate Data base /firstrun
const initiate_DB = require('./initiateDatabase');
router.route('/').post(initiate_DB.initiateDB);

module.exports = router;
