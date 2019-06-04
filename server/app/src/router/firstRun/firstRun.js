/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

// initDB 
const initDB = require('./initDB');
router.route('/').post(initDB.initDB);

module.exports = router;


// Create Databases
// Crate Schemas 
// Create Tables


