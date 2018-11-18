/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

const moment = require('moment'); // moment for Time and Date
const ObjectId = require('mongodb').ObjectID;
// config.pageInfo | config.flashData |
const config = require("../../../modules/config");

module.exports = {
  // POST
  // add statement module
  removeSta: function(req, res, next) {
    // get session info and set config.pageInfo
    config.pageInfo.title = "Statement";
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "post";
    config.pageInfo.active = "active";
    config.pageInfo.page = "Remove";
    console.log("\n" + config.pageInfo.title + " - " + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // if session is undefined - get - login page
    if (!req.session.user) {
      // if session empty // redirect login page
      res.redirect('/');
      console.log("\nsession incorrect - going home\n");
    } else {
      // else - session good - redirect to statement list
      // request DB conections
      const db = req.db;
      const collection = db.get(config.collectionBlingBlaw);
      // set validation Data
      // mongo pull the new statement
      collection.update({
          _id: req.session.userId,
          "statementInfo.statement_id": ObjectId(req.body.statement),
          "transactionInfo.statement_id": ObjectId(req.body.statement)
        }, {
          $pull: {
            "statementInfo": {
              statement_id: ObjectId(req.body.statement)
            },
            "transactionInfo": {
              statement_id: ObjectId(req.body.statement)
            }
          }
        }, {
          multi: true
        },
        function(err, results) {
          if (err) { // if err throw err
            config.flashData.pageMesage = "Error removing data" + JSON.stringify(err.message);
            config.flashData.bgColor = "danger";
            config.flashData.info = err;
            req.flash('flashData', config.flashData);
            res.redirect('/statement/review');
          }
          if (results) {
            config.flashData.pageMesage = "Statement been removed: " + req.body.removeCat;
            config.flashData.bgColor = "success";
            config.flashData.info = results;
            req.flash('flashData', config.flashData);
            res.redirect('/statement/review');
          }
        });
    }
  }

}
