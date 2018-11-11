/* No Var - let and const
 * try ES6 + async
 * NodeJS + Monk + Session = keep it simple
 */
// Express
const express = require('express');
const router = express.Router();

// get - /category
// post - curd
// all - /

// GET - category page
// Category - Dashboard - Home page
const viewCat = require('./catConfig/viewCat');
router.route('/').get(viewCat.viewCat);

// POST
// CRUD - Add Update Remove - Category
// mongo.update - PUSH | PULL | SET == Add | remove | update
// Add category
// post to add category/add
const addCat = require('./catConfig/addCat');
router.route('/add').post(addCat.addCat);
// Update category
// post to update category/Update
const updateCat = require('./catConfig/updateCat');
router.route('/update').post(updateCat.updateCat);
// Remove Category
// POST to remove category/remove
const removeCat = require('./catConfig/removeCat');
router.route('/remove').post(removeCat.removeCat);

module.exports = router;
