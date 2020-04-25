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
*/

const express = require('express');
const router = express.Router();
//
// Accounts
//
// create accountTransaction_table
const createAccount = require('./accountTransaction/createAccount');
router.route('/add').post(createAccount);
// view viewAllAccounts
const viewAllAccounts = require('./accountTransaction/viewAllAccounts');
router.route('/view').post(viewAllAccounts);
// Add userTransactionTable
const addTransaction = require('./accountTransaction/addTransaction');
router.route('/transaction/add').post(addTransaction);
// view userTransactionTable
const viewAllTransaction = require('./accountTransaction/viewAllTransaction');
router.route('/transaction/view').post(viewAllTransaction);
//
// AccountCategory
//
// add to AccountCategory
const addAccountCategory = require('./accountCateogry/addAccountCategory');
router.route('/category/add').post(addAccountCategory);
// view viewAccountCategory
const viewAccountCategory = require('./accountCateogry/viewAccountCategory');
router.route('/category/view').post(viewAccountCategory);
//
// AccountType
const { 
    CreateTable_AccountType, 
    View_AccountType, 
    Add_AccountType
} = require('./accountType');

// add to AccountType
router.route('/type/add').post(Add_AccountType);
// view viewAccountType
router.route('/type/view').post(View_AccountType);

module.exports = router;
