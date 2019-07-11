/* addNewFannyPack - Router
 * Keep it minimal
 */
const express = require('express');
const router = express.Router();

// add New FannyPack /add
const addFannyPack = require('./addFannyPack');
router.route('/add').post(addFannyPack.addNewFannyPack);

module.exports = router;
