/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

const moment = require('moment'); // moment for Time and Date
const ObjectId = require('mongodb').ObjectID;

const csvjson = require('csvjson'); //csv to json
const fs = require('fs'); // fs filesystem

// pageInfo | flashData |
const config = require("../../../modules/config");

module.exports = {

  // POST
  // Review post for submit new - module
  uploadSta: function(req, res, next) {
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
          // sotore in Session
          req.session.statementInfo = statementInfo;
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
          let transactionInfo = [];
          let csvTransactionInfo = csvjson.toArray(csvData, options);
          for (let i in csvTransactionInfo) {
            // inserting to upload object
            transactionInfo.push({
              transId: ObjectId(),
              transDate: csvTransactionInfo[i][0],
              transDesc: csvTransactionInfo[i][1],
              transWithdraw: csvTransactionInfo[i][2],
              transDeposite: csvTransactionInfo[i][3],
              transBalance: csvTransactionInfo[i][4]
            });
          };
          res.render('statement/upload', {
            pageInfo: config.pageInfo,
            dataCat: user.categoryInfo,
            transactionInfo: transactionInfo,
            statementInfo: statementInfo
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
  },

  // POST
  // add statement module
  addSta: function(req, res, next) {
    // get session info and set config.pageInfo
    config.pageInfo.title = "Statement";
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "POST";
    config.pageInfo.active = "active";
    config.pageInfo.page = "Add";
    console.log(config.pageInfo.title + " - " + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // if session is undefined - get - login page
    if (!req.session.user) {
      // if session empty // redirect login page
      res.redirect('/');
      console.log("\nsession incorrect - going home\n");
    } else {
      // else - session good - redirect to statement Dashboard
      let statement_id = ObjectId();
      let statementInfo = {
        statement_id: statement_id,
        statementName: req.session.statementInfo.statementName,
        statementType: req.session.statementInfo.statementType,
        statementDate: req.session.statementInfo.statementDate,
        statementDesc: req.session.statementInfo.statementDesc,
        statementFileInfo: req.session.statementInfo.statementFileInfo,
        statementCreated: moment().format('MMMM Do YYYY, h:mm:ss a'),
        statementModified: "",
        statementModifiedtUser: ""
      }
      // Break session storage
      req.session.statementInfo = "updated!";
      
      let transactionInfo = []
      for (transaction in req.body.transId) {
        let pushData = {
          transactionId: ObjectId(),
          transactionDate: req.body.transDate[transaction],
          transactionDesc: req.body.transDesc[transaction],
          transactionWithdraw: req.body.transWithdraw[transaction],
          transactionDeposite: req.body.transDeposite[transaction],
          transactionBalance: req.body.transBalance[transaction],
          transactiontCategory: req.body.transCatName[transaction],
          transactiontModified: "",
          transactiontModifiedUser: "",
          statement_id: statement_id
        }
        transactionInfo.push(pushData)
      }
      // set validation Data
      let valData = {
        "_id": req.session.userId
      }
      // request DB conections
      const db = req.db;
      const collection = db.get(config.collectionBlingBlaw);
      // mongo push the new category
      collection.update(valData, {
        $push: {
          "statementInfo": statementInfo,
          "transactionInfo": {
            "$each": transactionInfo
          }
        }
      }, function(err, results) {
        if (err) { // If it failed, return error
          console.log("err: " + err);
          config.flashData.pageMesage = "Error Inserting data";
          config.flashData.bgColor = "danger";
          config.flashData.info = err;
          req.flash('flashData', flashData);
          res.redirect('/statement');
        } else { // else add statement and redirect to statement Dashboard
          console.log("Statement added: " + JSON.stringify(results));
          config.flashData.pageMesage = "Statement been added: " + statementInfo.statementName;
          config.flashData.bgColor = "success";
          config.flashData.info = results;
          req.flash('flashData', config.flashData);
          res.redirect('/statement');
        }
      });
    }
  }
}
