// firstrun - Router
const { Add_user, Login, View_a_user, View_all_user } =  require('./router/user/user');
const {Install} = require('./router/firstrun/Install')

const express = require('express');
const router = express.Router();

router.route('/install').get(Install);

router.route('/user/add').post(Add_user);
router.route('/user/login').post(Login);
router.route('/user/view').get(View_a_user);
router.route('/user/view/all').get(View_all_user);

// User
// Add
// View
// ViewAll

module.exports = router;