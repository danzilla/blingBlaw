// Account - Router
const express = require('express');
const router = express.Router();

// add account
const addAccount = require('./addAccount');
router.route('/add').post(addAccount);

module.exports = router;
