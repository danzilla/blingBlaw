/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

// POST - Create Table
const createTable = require('./createTable');
router.route('/createTable').post(createTable.createTable);


// POST - Add pre-data
const preData = require('./addDumpData');
router.route('/dummyData').get(preData.addDummyData);


module.exports = router;
