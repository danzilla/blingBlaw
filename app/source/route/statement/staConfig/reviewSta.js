/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

// config.pageInfo | flashData |
const config = require("../../../modules/config");

module.exports = {
  // GET
  // GET module
  reviewStaGet: function(req, res, next) {
    // get session info
    config.pageInfo.title = "Statement";
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.active = "active";
    config.pageInfo.page = "review";
    config.pageInfo.request = "GET";
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
        if (!err && user) {

          const ObjectId = require('mongodb').ObjectID;
          const _ = require('lodash');
          const groupArray = require('group-array');
          // Plan
          // filter by statment ID
          // 1 - If coming from statment - show all transactions
          // 2 - If coming from reviewPOST - show the one from session - statement_id
          try {
            // filter by statement_id
            // Set page for GET and render ALL statment
            // is coming from Sessions
            let transactions = "user.transactionInfo";
            let statement = "user.statementInfo;"
            if (req.session.statementInfo[0].statement_id) {
              // If comping from POST /review
              config.pageInfo.request = "GETPOST";
              // filter by statement_id
              transactions = _.filter(user.transactionInfo, {
                statement_id: ObjectId(req.session.statementInfo[0].statement_id)
              })
              statement = _.filter(user.statementInfo, {
                statement_id: ObjectId(req.session.statementInfo[0].statement_id)
              })
            } else {
              config.pageInfo.request = "GET";
              transactions = user.transactionInfo;
              statement = user.statementInfo;
            }
            // cat = root
            // trans cat = ch
            let catParent = [];
            let catChild = [];
            // Loop through Category for parent
            for (let cat = 0; cat < user.categoryInfo.length; cat++) {
              if (user.categoryInfo[cat].catParent === "root") {
                // Parent catParent
                catParent.push(user.categoryInfo[cat])
              } else {
                // child catChild
                catChild.push(user.categoryInfo[cat])
              }
            }
            //  console.log("\ntransactions: " + JSON.stringify(transactions));
            //  console.log("statement: " + JSON.stringify(statement));
            // get cat info from transactiontCategory
            const transactionsInfo = [];
            for (var i = 0; i < transactions.length; i++) {
              let pushD = {};
              if (transactions[i].transactiontCategory == "nada") {
                pushD = {
                  "transactionId": transactions[i].transactionId,
                  "transactionDate": transactions[i].transactionDate,
                  "transactionDesc": transactions[i].transactionDesc,
                  "transactionWithdraw": transactions[i].transactionWithdraw,
                  "transactionDeposite": transactions[i].transactionDeposite,
                  "transactionBalance": transactions[i].transactionBalance,
                  "transactiontCategory": transactions[i].transactiontCategory,
                  "transactiontCategoryName": transactions[i].transactiontCategory,
                  "transactiontCategoryParent": transactions[i].transactiontCategory,
                  "transactiontCategoryParentName": transactions[i].transactiontCategory,
                  "transactiontModified": transactions[i].transactiontModified,
                  "transactiontModifiedUser": transactions[i].transactiontModifiedUser,
                  "statement_id": transactions[i].statement_id,
                  "statementName": statement[0].statementName,
                  "statementType": statement[0].statementType,
                  "statementDate": statement[0].statementDate,
                  "statementCreated": statement[0].statementCreated
                }
                // push "nada" to transactionInfo
                transactionsInfo.push(pushD)
              } else {
                for (var ii = 0; ii < catChild.length; ii++) {
                  if (transactions[i].transactiontCategory == catChild[ii]._id) {
                    for (var iii = 0; iii < catParent.length; iii++) {
                      if (catChild[ii].catParent == catParent[iii]._id) {
                        pushD = {
                          "transactionId": transactions[i].transactionId,
                          "transactionDate": transactions[i].transactionDate,
                          "transactionDesc": transactions[i].transactionDesc,
                          "transactionWithdraw": Number(transactions[i].transactionWithdraw),
                          "transactionDeposite": Number(transactions[i].transactionDeposite),
                          "transactionBalance": Number(transactions[i].transactionBalance),
                          "transactiontCategory": transactions[i].transactiontCategory,
                          "transactiontCategoryName": catChild[ii].catName,
                          "transactiontCategoryParent": catChild[ii].catParent,
                          "transactiontCategoryParentName": catParent[iii].catName,
                          "transactiontModified": transactions[i].transactiontModified,
                          "transactiontModifiedUser": transactions[i].transactiontModifiedUser,
                          "statement_id": transactions[i].statement_id,
                          "statementName": statement[0].statementName,
                          "statementType": statement[0].statementType,
                          "statementDate": statement[0].statementDate,
                          "statementCreated": statement[0].statementCreated
                        }
                        // push to transactionInfo
                        transactionsInfo.push(pushD)
                      }
                    }
                  }
                }
              }
            }
            let groupByTransCat = groupArray(transactionsInfo, 'transactiontCategoryParentName');
            let groupByTranasCatLabel = Object.keys(groupByTransCat);
            console.log("groupByTranasCatLabel: " + groupByTranasCatLabel);
            // console.log("\groupByTransCat: " + JSON.stringify(groupByTransCat));

            let chartLabel = Object.keys(groupByTransCat);
            let chartData = [];
            let chartColor = [];
            let ohhP = {};

            for (var t in groupByTransCat) {

              let balanceSum = [];
              let depositeSum = [];
              let withdrawSum = [];
              let labelC = [];
              let labelP = [];
              for (var tt in groupByTransCat[t]) {
                // array for SUM
                balanceSum.push(groupByTransCat[t][tt].transactionBalance);
                depositeSum.push(groupByTransCat[t][tt].transactionDeposite);
                withdrawSum.push(groupByTransCat[t][tt].transactionWithdraw);
                labelC.push(groupByTransCat[t][tt].transactiontCategoryName);
                labelP.push(groupByTransCat[t][tt].transactiontCategoryParentName);
              }

              console.log("\ngroupByTransCat -- " + labelP[0]);
              console.log("balanceSum: " + balanceSum);
              console.log("depositeSum: " + depositeSum);
              console.log("withdrawSum: " + withdrawSum);
              console.log("labelC: " + labelC);
              console.log("labelP: " + labelP[0]);
              // chartColor Each Label for Groups
              chartColor.push(config.randomColor());
            }

            console.log("\nchartLabel: " + chartLabel);
            console.log("chartData: " + chartData);
            console.log("chartColor: " + chartColor);


            // ChartInfo
            // chartData - catP
            // chartData - catC
            //  let groupByTranasCat = groupArray(transactionsInfo, 'transactiontCategory');
            //  let groupByTranasCatLabel = Object.keys(groupByTranasCat);
            // console.log("\ngroupByTranasCatLabel: " + JSON.stringify(groupByTranasCatLabel));
            // console.log("\ngroupByTranasCat: " + JSON.stringify(groupByTranasCat));
            // chartData - deposite
            // chartData - withdraw
            // chartData - Balance
            // chartData - Description
            let groupByTranasDec = groupArray(transactionsInfo, 'transactionDesc');
            let groupByTranasDecLabel = Object.keys(groupByTranasDec);
            //console.log("groupByTranasCatLabel" + JSON.stringify(groupByTranasDecLabel));
            // chartData - deposite

            // Chart label === Category child - Parents
            // Chart data === Category child - SUM
            // Chart Color === randomColor

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

            res.render('statement/review', {
              pageInfo: config.pageInfo,
              dataCat: user.categoryInfo,
              dataSta: statement,
              dataTrans: transactions,
              chartInfo: chartInfo
            });
          } catch (err) {
            // any other request view all statments and transactions and category
            let errMsg = "Failed at catch err " + err;
            config.flashData.pageMesage = errMsg;
            config.flashData.bgColor = "danger";
            req.flash('flashData', config.flashData);
            res.redirect('/statement');
          }
        } else {
          let errMsg = "Session mismatch! - Failed at viewing Statement";
          config.flashData.pageMesage = errMsg;
          config.flashData.bgColor = "danger";
          req.flash('flashData', config.flashData);
          res.redirect('/');
        }
      });
    }
  },
  // POST
  // postLogin module
  reviewStaPost: function(req, res, next) {
    // get session info
    config.pageInfo.title = "Statement";
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "POST";
    config.pageInfo.active = "active";
    config.pageInfo.page = "review";
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
        if (!err && user && req.body.statement) {

          const ObjectId = require('mongodb').ObjectID;
          const _ = require('lodash');

          // Plan
          // filter by statment ID
          try {
            // filter by statement_id
            let transactions = _.filter(user.transactionInfo, {
              statement_id: ObjectId(req.body.statement)
            })
            let statement = _.filter(user.statementInfo, {
              statement_id: ObjectId(req.body.statement)
            })
            let category = _(user.categoryInfo).groupBy("catParent")
            // set session on POST to /review
            req.session.statementInfo = statement;





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



            // render results
            res.render('statement/review', {
              pageInfo: config.pageInfo,
              dataCat: user.categoryInfo,
              dataSta: statement,
              dataTrans: transactions,
              chartInfo: chartInfo
            });
          } catch (err) {
            // any other request view all statments and transactions and category
            // redirect /review - All statments
            res.redirect('/statement/review');
          }
        } else {
          let errMsg = "Session mismatch! - Failed at viewing Statement";
          config.flashData.pageMesage = errMsg;
          config.flashData.bgColor = "danger";
          req.flash('flashData', config.flashData);
          res.redirect('/');
        }
      });
    }
  }
  // end of EXPORT
}
