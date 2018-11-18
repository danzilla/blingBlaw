/* No Var - let and const
 * try ES6 + async
 * NodeJS + Monk + Session = keep it simple
 */
// Express
const express = require('express');
const router = express.Router();

const moment = require('moment'); // moment for Time and Date
const csvjson = require('csvjson'); //csv to json
const fs = require('fs'); // fs filesystem

// multer for file upload
// upload location app/uploads/
const multer = require('multer');
const uploadFolder = multer({
  dest: 'app/uploads/'
});

// get - /statement
// post - curd
// all - /

// GET - statement page - Dashboard
// Statement - Dashboard - Home page
const viewSta = require('./staConfig/index');
router.route('/').get(viewSta.viewSta);

// POST - overview on POST
// /overview - show statment for update
const reviewSta = require('./staConfig/reviewSta');
router.route('/review').get(reviewSta.reviewStaGet);
router.route('/review').post(reviewSta.reviewStaPost);

// POST
// CRUD - Add Update Remove - Statement
// mongo.update - PUSH | PULL | SET == Add | remove | update

// POST - review before Upload the Document
// POST /upload - convert CSV to table and display
const uploadSta = require('./staConfig/uploadSta');
router.route('/upload').post(uploadFolder.single('statementFileInput'), uploadSta.uploadSta);
// Add statement
// post to add statement/add
router.route('/upload/add').post(uploadSta.addSta);

// Update statement
// post to update statement/Update
const updateSta = require('./staConfig/updateSta');
router.route('/update').post(updateSta.updateSta);
// Remove Statement
// POST to remove statement/remove
const removeSta = require('./staConfig/removeSta');
router.route('/remove').post(removeSta.removeSta);

module.exports = router;
