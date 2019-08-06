// Account - Router
const express = require('express');
const router = express.Router();

// create accountTransaction_table
const addAccountTransaction = require('./accounTransaction/addAccountTransaction');
router.route('/transaction/add').post(addAccountTransaction);

module.exports = router;
