/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

// Create DB
// createDB
const createDB = require('./createDB');
router.route('/createDB').post(createDB.createDB);

// Create Schema
// createSchema
const createSchema = require('./createSchema');
router.route('/createSchema').post(createSchema.createDB);

// POST - Create Table
// createTable
const createTable = require('./createTable');
router.route('/createTable').post(createTable.createDB);


module.exports = router;
