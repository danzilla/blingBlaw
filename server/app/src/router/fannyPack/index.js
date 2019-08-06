// FannyPack - Router
const express = require('express');
const router = express.Router();

// add FannyPack
const addFannyPack = require('./addFannyPack');
router.route('/add').post(addFannyPack);

module.exports = router;
