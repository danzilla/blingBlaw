/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

const moment = require('moment'); // moment for Time and Date
const ObjectId = require('mongodb').ObjectID;
// pageInfo | flashData |
const config = require("../../../modules/config");

module.exports = {
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
      let transactionInfo = []
      for (transaction in req.body.transId) {
        let pushData = {
          transactionId: ObjectId(),
          transactionDate: req.body.transDate[transaction],
          transactionDesc: req.body.transDesc[transaction],
          transactionWithdraw: req.body.transWithdraw[transaction],
          transactionDeposite: req.body.transDeposite[transaction],
          transactionBalance: req.body.transBalance[transaction],
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
