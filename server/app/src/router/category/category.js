/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it simple
 */
const express = require('express');
const router = express.Router();

// REACT /routes 

// /category/add
// /category/view
// /category/remove
// /category/update 

// GET
// GET all Categories 
const viewCategory = require('./viewCategory');
router.route('/view').get(viewCategory.viewCategory);

// POST
// ADD new Category
const addCategory = require('./addCategory');
router.route('/add').post(addCategory.addCategory);

module.exports = router;
