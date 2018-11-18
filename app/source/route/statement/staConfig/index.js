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
          // Clear session
          req.session.statementInfo = "Dashboard";

          const _ = require('lodash');
          let nadaTransaction = _.filter(user.transactionInfo, {
            transactiontCategory: 'nada'
          })

          // prepare chart info
          const chartInfo = {
            chartName: "Category and subcategory - diversify",
            chartData: {
              dataLabel: [],
              dataValue: [],
              dataColor: []
            }
          }
          // category chartInfo
          // get Cat in two Arrays
          // go through all category list
          let categoryLenth = user.categoryInfo.length;
          for (let catPSize = 0; catPSize < categoryLenth; catPSize++) {
            // if root - parent category
            if (user.categoryInfo[catPSize].catParent == "root") {
              // push to dataLabel array - catParent
              chartInfo.chartData.dataLabel.push(user.categoryInfo[catPSize].catName);
              chartInfo.chartData.dataColor.push(config.randomColor());
              let subCatTotal = 0; //set total-subCat
              for (let catCSize = 0; catCSize < user.categoryInfo.length; catCSize++) {
                // subcategory list = parentID
                if (user.categoryInfo[catPSize]._id == user.categoryInfo[catCSize].catParent) {
                  // count sub category
                  subCatTotal++;
                }
              }
              // push to dataValue - count child array
              chartInfo.chartData.dataValue.push(subCatTotal);
            }
          }

          res.render('statement/index', {
            pageInfo: config.pageInfo,
            dataCat: user.categoryInfo,
            dataSta: user.statementInfo,
            dataTrans: nadaTransaction,
            chartInfo: chartInfo
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
