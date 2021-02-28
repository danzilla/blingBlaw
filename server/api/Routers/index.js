// API - Router
const express = require('express');
const router = express.Router();

const { Test, Test2 } = require('./API_Routes/_test')
router.route('/test1').get(Test);
router.route('/test2').get(Test);


// Initiate Database
const { Install } = require('./API_Routes/firstrun/Install');
router.route('/install').get(Install);


// User
const { Add_user, Login, View_a_user, View_all_user } =  require('./API_Routes/user');
router.route('/user/login').post(Login);
router.route('/user/add').post(Add_user);
router.route('/user/view').post(View_a_user);
router.route('/user/view/all').get(View_all_user);


// FannyPack
const { Add_Fanny, View_user_fanny, View_all_user_fanny } = require('./API_Routes/fannyPack');
router.route('/fannypack/add').post(Add_Fanny);
router.route('/fannypack/view').post(View_user_fanny);
router.route('/fannypack/view/all').get(View_all_user_fanny);


// Account - Records
const { Add_AccountRecord, View_AccountRecord } = require('./API_Routes/account/accountRecord');
router.route('/account/add').post(Add_AccountRecord);
router.route('/account/view').post(View_AccountRecord);
// Account - Types
const { Add_AccountType, View_AccountType } = require('./API_Routes/account/accountType');
router.route('/account/type/add').post(Add_AccountType);
router.route('/account/type/view').post(View_AccountType);
// Account - Category
const { Add_AccountCategory, View_AccountCategory } = require('./API_Routes/account/accountCateogry');
router.route('/account/category/add').post(Add_AccountCategory);
router.route('/account/category/view').post(View_AccountCategory);


// Export 
module.exports = router;