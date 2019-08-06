// Account - Router
const express = require('express');
const router = express.Router();

// create accountTransaction_table
const addAccountTransaction = require('./accounTransaction/addAccountTransaction');
router.route('/transaction/add').post(addAccountTransaction);

// add to AccountCategory
const addAccountCategory = require('./accountCateogry/addAccountCategory');
router.route('/category/add').post(addAccountCategory);

module.exports = router;
