/* addNewFannyPack - Router
 * Keep it minimal
 */
const express = require('express');
const router = express.Router();

// add New FannyPack /add
const addFannyPack = require('./addFannyPack');
router.route('/add').post(addFannyPack);

// view FannyPack /view
const viewFannyPack = require('./viewFannyPack');
router.route('/view').post(viewFannyPack);

module.exports = router;
