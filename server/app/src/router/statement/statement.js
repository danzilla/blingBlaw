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
const viewStatement = require('./viewStatement');
router.route('/view').get(viewStatement.viewStatement);

// POST
// ADD new Category
const addStatement = require('./addStatement');
router.route('/add').post(addStatement.addStatement);

module.exports = router;
