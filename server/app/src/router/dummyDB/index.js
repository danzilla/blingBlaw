/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

// POST - Create Table
const createDB = require('./createDB');
router.route('/createTable').post(createDB.createDB);

module.exports = router;
