/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

const moment = require('moment'); // moment for Time and Date
const csvjson = require('csvjson'); //csv to json
const fs = require('fs'); // fs filesystem

const ObjectId = require('mongodb').ObjectID;
// config.pageInfo | flashData |
const config = require("../../../modules/config");

module.exports = {
  // POST
  // postLogin module
  reviewSta: function(req, res, next) {
    // get session info
    config.pageInfo.title = "Statement";
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "POST";
    config.pageInfo.active = "active";
    config.pageInfo.page = "Review";
    console.log("\n" + config.pageInfo.title + " - " + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // if session is undefined - get - login page
    if (!req.session.user) {
      // if session empty // redirect login page
      res.redirect('/');
      console.log("\nsession incorrect - going Home\n");
    } else {
      // else - session good - procced
      console.log("Active session: " + req.session.user);
      // request DB conections
      const db = req.db;
      const collectionBling = db.get(config.collectionBlingBlaw);
      collectionBling.findOne({
        "userInfo.userName": req.session.user
      }, function(err, user) {
        if (err) {
          console.log("\nerror: " + JSON.stringify(err));
        }
        if (user) {
          // user logged in
          // Upload object - setting up for Statement and transaction
          let uploadInfo = {
            statementInfo: "",
            transactionInfo: []
          };
          // Statement array from GET upload
          let statementInfo = {
            statementName: req.body.statementName,
            statementType: req.body.statementType,
            statementDate: req.body.statementDate,
            statementDesc: req.body.statementDesc,
            statementFileInfo: req.file,
            statementuploadDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
          };
          // set statementInfo
          req.session.statementInfo = statementInfo;
          // inserting to upload object
          uploadInfo.statementInfo = statementInfo;
          // getting CSV to JSON
          let csvFile = req.file.path;
          let csvData = fs.readFileSync(csvFile, {
            encoding: 'utf8'
          });
          let options = {
            delimiter: ',', // optional
            quote: '"' // optional
          };
          // transactionInfo = New array to store json formated transaction
          let csvTransactionInfo = csvjson.toArray(csvData, options);
          for (let i in csvTransactionInfo) {
            // inserting to upload object
            uploadInfo.transactionInfo.push({
              transId: ObjectId(),
              transDate: csvTransactionInfo[i][0],
              transDesc: csvTransactionInfo[i][1],
              transWithdraw: csvTransactionInfo[i][2],
              transDeposite: csvTransactionInfo[i][3],
              transBalance: csvTransactionInfo[i][4]
            });
          };
          res.render('statement/review', {
            pageInfo: config.pageInfo,
            dataCat: user.categoryInfo,
            uploadInfo: uploadInfo
          });
        } else {
          console.log("Session mismatch! - Failed at viewing Statement");
          config.flashData.pageMesage = "Session mismatch, cannot continue - Failed at viewing Category";
          config.flashData.bgColor = "danger";
          req.flash('flashData', config.flashData);
          res.redirect('/');
        }
      });
    }
  }
  // end of EXPORT
}
