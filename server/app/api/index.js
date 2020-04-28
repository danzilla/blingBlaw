// firstrun - Router
const express = require('express');
const router = express.Router();

const firstRun = require('./router/firstrun/')
router.route('/install').get(firstRun);

module.exports = router;
