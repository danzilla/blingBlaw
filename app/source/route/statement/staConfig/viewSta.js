/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

// config.pageInfo | flashData |
const config = require("../../../modules/config");

module.exports = {
  // POST
  // postLogin module
  viewSta: function(req, res, next) {
    // get session info
    config.pageInfo.title = "Statement";
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "GET";
    config.pageInfo.active = "active";
    config.pageInfo.page = "Dashboard";
    console.log("\n" + config.pageInfo.title + " - " + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // if session user is empty
    if (!req.session.user) {
      // if session empty // redirect login page
      res.redirect('/');
      console.log("\nsession incorrect - going Home\n");
    } else {
      //else
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


        for(statement in user.statementInfo){
          for(transaction in user.transactionInfo){
            if (user.transactionInfo[transaction].statementName == "asd"){
              console.log("\nStatements: " + transaction +" "+ JSON.stringify(user.statementInfo[statement].statement_id));
              console.log("Transaction: " + transaction +" "+ JSON.stringify(user.transactionInfo[transaction].statement_id));
            }
            else {
              console.log("\nELSE\n");
            }
          }
        }

          let statementInfo = {
            test: "statementInfo",
            "req.body": req.body
          }
          res.render('statement/index', {
            pageInfo: config.pageInfo,
            dataCat: user.categoryInfo,
            dataSta: user.statementInfo,
            dataTrans: user.transactionInfo
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
