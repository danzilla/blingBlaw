/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it simple
 */
const express = require('express');
const router = express.Router();

// User - Dashboard
// GET - user page
const viewUser = require('./userConfig/viewUser');
router.route('/').get(viewUser.viewUser);
// User - Dashboard
// GET - user page (DEV Register)
const addUser = require('./userConfig/addUser');
router.route('/add').get(addUser.addUserGET);

// Add users
// post to add user/add
router.route('/add').post(addUser.addUserPOST);
// Remove user
// POST to remove user/remove
const removeUser = require('./userConfig/removeUser');
router.route('/remove').post(removeUser.removeUser);

module.exports = router;
