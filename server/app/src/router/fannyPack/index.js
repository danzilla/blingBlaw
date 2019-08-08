// FannyPack - Router
const express = require('express');
const router = express.Router();

// add FannyPack
const addFannyPack = require('./addFannyPack');
router.route('/add').post(addFannyPack);
// View FannyPack
const viewUserFannyPack = require('./viewUserFannyPack');
router.route('/view').post(viewUserFannyPack);
// View all FannyPack
const viewAllFannyPack = require('./viewAllFannyPack');
router.route('/view/all').post(viewAllFannyPack);

module.exports = router;
