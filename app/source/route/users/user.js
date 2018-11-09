/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it simple
 */
const express = require('express');
const router = express.Router();
const moment = require('moment'); // moment for Time and Date

// User - Register
// GET - Register page
router.get('/add', );

// User - Dashboard
// GET - user page
const viewUser = require('./userConfig/viewUser');
router.route('/').get(viewUser.viewUser);
// User - Dashboard
// GET - user page
const addUser = require('./userConfig/addUser');
router.route('/add').get(addUser.addUserGET);
//
// POST
// CRUD - Add Update Remove - Users
//
// Add users
// post to add user/add
router.route('/add').post(addUser.addUserPOST);
// Update users
// post to update user/Update
const updateUser = require('./userConfig/updateUser');
router.route('/update').post(updateUser.updateUser);
// Remove user
// POST to remove user/remove
const removeUser = require('./userConfig/removeUser');
router.route('/remove').post(removeUser.removeUser);

module.exports = router;
