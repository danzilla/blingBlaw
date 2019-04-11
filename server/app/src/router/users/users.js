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
// Remove user
// POST to remove user/remove
const removeUser = require('./userConfig/removeUser');
router.route('/remove').post(removeUser.removeUser);


// REACT /routes 

// users/add
// users/view
// users/remove
// usres/update 

// Add users
// post to add user/add
const addUser1 = require('./addUser/addUser');
router.route('/add').post(addUser1.addUserPOST);

// View All users
// GET to add user/add
const viewUser1 = require('./viewUser/viewUser');
router.route('/view').get(viewUser1.viewUser);



module.exports = router;
