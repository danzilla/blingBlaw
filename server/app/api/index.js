// firstrun - Router
const { Add_user, Login } =  require('./router/user/user');

const express = require('express');
const router = express.Router();

const Create_DB = require('./router/firstrun/')
router.route('/install').get(Create_DB);

router.route('/user/add').get(Add_user);
router.route('/user/login').get(Login);

// User
// Add
// View
// ViewAll



module.exports = router;
