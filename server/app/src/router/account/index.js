// Account - Router
/* 
   Database - blingblaw
   └───Schema - users
    | │ Table - user_auth
    | │ Table - user_details
    │ │ Table - fannypacks
    └───Schema - fannypacks_fanny_serial
    | │ Table - account_category
    │ │ Table - account_type 
    │ │ Table - account_record
    │ │ Table - account_account_serial
     
	add_newAccountCategory_to_accountCategory
*/

const express = require('express');
const router = express.Router();


// add to AccountCategory
const addAccountCategory = require('./accountCateogry/addAccountCategory');
router.route('/category/add').post(addAccountCategory);

// add to AccountCategory
const addAccountType = require('./accountType/addAccountType');
router.route('/type/add').post(addAccountType);

// create accountTransaction_table
const addAccountTransaction = require('./accounTransaction/addAccountTransaction');
router.route('/transaction/add').post(addAccountTransaction);


module.exports = router;
