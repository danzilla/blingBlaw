// firstrun - Router
const { Add_user, Login, View_a_user, View_all_user } =  require('./router/user/user');
const {Install} = require('./router/firstrun/Install');
const { Add_Fanny, View_user_fanny, View_all_user_fanny } = require('./router/fannyPack/fannyPack');

const express = require('express');
const router = express.Router();

router.route('/install').get(Install);

router.route('/user/add').post(Add_user);
router.route('/user/login').post(Login);
router.route('/user/view').get(View_a_user);
router.route('/user/view/all').get(View_all_user);

router.route('/fannypack/add').get(Add_Fanny);
router.route('/fannypack/view').get(View_user_fanny);
router.route('/fannypack/view/all').get(View_all_user_fanny);

// User
// Add
// View
// ViewAll

module.exports = router;