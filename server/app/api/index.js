// API - Router
const express = require('express');
const router = express.Router();
// Initiate Database
const {Install} = require('./router/firstrun/Install');
router.route('/install').get(Install);
// User
const { Add_user, Login, View_a_user, View_all_user } =  require('./router/user');
router.route('/user/add').post(Add_user);
router.route('/user/login').post(Login);
router.route('/user/view').post(View_a_user);
router.route('/user/view/all').get(View_all_user);
// FannyPack
const { Add_Fanny, View_user_fanny, View_all_user_fanny } = require('./router/fannyPack');
router.route('/fannypack/add').post(Add_Fanny);
router.route('/fannypack/view').post(View_user_fanny);
router.route('/fannypack/view/all').get(View_all_user_fanny);
// Account - Records
const { Add_AccountRecord, View_AccountRecord } = require('./router/account/accountRecord');
router.route('/account/add').post(Add_AccountRecord);
router.route('/account/view').post(View_AccountRecord);
// Account - Types
const { Add_AccountType, View_AccountType } = require('./router/account/accountType');
router.route('/account/type/add').post(Add_AccountType);
router.route('/account/type/view').post(View_AccountType);
// Account - Category
const { Add_AccountCategory, View_AccountCategory } = require('./router/account/accountCateogry');
router.route('/account/category/add').post(Add_AccountCategory);
router.route('/account/category/view').post(View_AccountCategory);
// Export 
module.exports = router;