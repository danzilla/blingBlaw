// API - Router
const express = require('express');
const router = express.Router();

const {Install} = require('./router/firstrun/Install');
router.route('/install').get(Install);

const { Add_user, Login, View_a_user, View_all_user } =  require('./router/user');
router.route('/user/add').post(Add_user);
router.route('/user/login').post(Login);
router.route('/user/view').get(View_a_user);
router.route('/user/view/all').get(View_all_user);

const { Add_Fanny, View_user_fanny, View_all_user_fanny } = require('./router/fannyPack');
router.route('/fannypack/add').get(Add_Fanny);
router.route('/fannypack/view').get(View_user_fanny);
router.route('/fannypack/view/all').get(View_all_user_fanny);

const { Add_AccountRecord, View_AccountRecord } = require('./router/account/accountRecord');
router.route('/account/account/add').get(Add_AccountRecord);
router.route('/account/account/view').get(View_AccountRecord);

const { Add_AccountType, View_AccountType } = require('./router/account/accountType');
router.route('/account/type/add').get(Add_AccountType);
router.route('/account/type/view').get(View_AccountType);

const { Add_AccountCategory, View_AccountCategory } = require('./router/account/accountCateogry');
router.route('/account/category/add').get(Add_AccountCategory);
router.route('/account/category/view').get(View_AccountCategory);

module.exports = router;