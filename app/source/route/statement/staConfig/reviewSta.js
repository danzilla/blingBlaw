/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

// config.pageInfo | flashData |
const config = require("../../../modules/config");
const randomColor = require('randomcolor'); // import the script


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

          // require config
          const ObjectId = require('mongodb').ObjectID;
          const _ = require('lodash');
          const groupArray = require('group-array');
          const money = require("money-math");
          // Plan
          // filter by statment ID
          // 1 - If coming from statment - show all transactions
          // 2 - If coming from reviewPOST - show the one from session - statement_id
          try {
            // Filter by statement_id
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
              // CHART BY statement_id summary / Parent Summary
              config.pageInfo.request = "GET";
              transactions = user.transactionInfo;
              statement = user.statementInfo;
            }

            const cartResult = require("./chartReview");
            let chart = cartResult.hi(user);
            console.log("CHART! : " + JSON.stringify(chart));


            // cat = root
            // trans cat = ch
            let catParent = [];
            let catChild = [];
            // Loop through Category for parent
            // Add colors to arrays
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
              if (transactions[i].transactiontCategory == "nada") {
                let pushD = {
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
                        let pushD = {
                          "transactionId": transactions[i].transactionId,
                          "transactionDate": transactions[i].transactionDate,
                          "transactionDesc": transactions[i].transactionDesc,
                          "transactionWithdraw": transactions[i].transactionWithdraw,
                          "transactionDeposite": transactions[i].transactionDeposite,
                          "transactionBalance": transactions[i].transactionBalance,
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
            // console.log("transactionsInfo" + JSON.stringify(transactionsInfo[0]));

            // Charts - Categorize by Category Parent and Child
            // Parent and Child categoryInfo
            const charts = {
              chartParent: {
                chartName: "Over all spending",
                chartLabel: [],
                chartColor: [],
                dataValueWithdraw: [],
                dataValueBalance: [],
                dataValueDeposite: [],
                parentCategoryId: []
              },
              chartChild: {
                chartName: "more insight..",
                chartLabel: [],
                chartColor: [],
                dataValueWithdraw: [],
                dataValueBalance: [],
                dataValueDeposite: [],
                childCategoryId: []
              }
            }

            // GROUP BY Category
            // Group by groupByTransCatChild
            let groupByTransCatChild = groupArray(transactionsInfo, 'transactiontCategoryName');
            // console.log("\n groupByTransCat" + JSON.stringify(groupByTransCat) + "\n");

            // find total spending for parenet category
            // Total spend for W | B | D
            // Go through Child name Category - GROUP
            for (let cat in groupByTransCatChild) {
              if (groupByTransCatChild.hasOwnProperty(cat)) {
                // console.log("\n--Cat Child: " + cat);
                charts.chartChild.chartLabel.push(cat);
                charts.chartChild.chartColor.push(config.randomColor({
                  luminosity: 'light',
                  format: 'hsla',
                  alpha: 0.5
                }));
                // Go through Child Category -GROUP
                let pushD = {
                  dataValueWithdraw: [],
                  dataValueBalance: [],
                  dataValueDeposite: []
                };
                for (let catC in groupByTransCatChild[cat]) {
                  if (groupByTransCatChild[cat].hasOwnProperty(catC)) {
                    pushD.dataValueWithdraw.push(groupByTransCatChild[cat][catC].transactionWithdraw);
                    pushD.dataValueBalance.push(groupByTransCatChild[cat][catC].transactionBalance);
                    pushD.dataValueDeposite.push(groupByTransCatChild[cat][catC].transactionDeposite);
                  }
                }
                charts.chartChild.dataValueWithdraw.push(config.sum(pushD.dataValueWithdraw));
                charts.chartChild.dataValueBalance.push(config.sum(pushD.dataValueBalance));
                charts.chartChild.dataValueDeposite.push(config.sum(pushD.dataValueDeposite));
              }
            }
            // console.log("charts" + JSON.stringify(charts.chartChild));

            // GrOUP BY category Parents
            // Group by transaCatParent
            let groupByTransCat = groupArray(transactionsInfo, 'transactiontCategoryParentName');
            // console.log("\n groupByTransCat" + JSON.stringify(groupByTransCat) + "\n");

            // find total spending for parenet category
            // Total spend for W | B | D
            // Go through Parent Category -GROUP
            for (let catP in groupByTransCat) {
              if (groupByTransCat.hasOwnProperty(catP)) {
                // console.log("\n--Cat Parent: " + catP);
                charts.chartParent.chartLabel.push(catP);
                charts.chartParent.chartColor.push(config.randomColor({
                  luminosity: 'light',
                  format: 'hsla',
                  alpha: 0.5
                }));
                // Go through Child Category -GROUP
                let pushD = {
                  dataValueWithdraw: [],
                  dataValueBalance: [],
                  dataValueDeposite: []
                };
                for (let catC in groupByTransCat[catP]) {
                  if (groupByTransCat[catP].hasOwnProperty(catC)) {
                    pushD.dataValueWithdraw.push(groupByTransCat[catP][catC].transactionWithdraw);
                    pushD.dataValueBalance.push(groupByTransCat[catP][catC].transactionBalance);
                    pushD.dataValueDeposite.push(groupByTransCat[catP][catC].transactionDeposite);
                  }
                }
                charts.chartParent.dataValueWithdraw.push(config.sum(pushD.dataValueWithdraw));
                charts.chartParent.dataValueBalance.push(config.sum(pushD.dataValueBalance));
                charts.chartParent.dataValueDeposite.push(config.sum(pushD.dataValueDeposite));
              }
            }
            // console.log("charts" + JSON.stringify(charts.chartParent));

            // console.log("ChartInfo: " + JSON.stringify(chartInfo));
            res.render('statement/review', {
              pageInfo: config.pageInfo,
              dataCat: user.categoryInfo,
              dataSta: statement,
              dataTrans: transactionsInfo,
              charts: charts
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

          // require config
          const ObjectId = require('mongodb').ObjectID;
          const _ = require('lodash');
          const groupArray = require('group-array');
          const money = require("money-math");
          // Plan
          // filter by statment ID
          // 1 - If coming from statment - show all transactions
          // 2 - If coming from reviewPOST - show the one from session - statement_id
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
              if (transactions[i].transactiontCategory == "nada") {
                let pushD = {
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
                        let pushD = {
                          "transactionId": transactions[i].transactionId,
                          "transactionDate": transactions[i].transactionDate,
                          "transactionDesc": transactions[i].transactionDesc,
                          "transactionWithdraw": transactions[i].transactionWithdraw,
                          "transactionDeposite": transactions[i].transactionDeposite,
                          "transactionBalance": transactions[i].transactionBalance,
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
            // console.log("transactionsInfo" + JSON.stringify(transactionsInfo[0]));

            // Charts - Categorize by Category Parent and Child
            // Parent and Child categoryInfo
            const charts = {
              chartParent: {
                chartName: "Over all spending",
                chartLabel: [],
                chartColor: [],
                dataValueWithdraw: [],
                dataValueBalance: [],
                dataValueDeposite: [],
                parentCategoryId: []
              },
              chartChild: {
                chartName: "more insight..",
                chartLabel: [],
                chartColor: [],
                dataValueWithdraw: [],
                dataValueBalance: [],
                dataValueDeposite: [],
                childCategoryId: []
              }
            }

            // Group by groupByTransCatChild
            let groupByTransCatChild = groupArray(transactionsInfo, 'transactiontCategoryParentName');
            // console.log("\n groupByTransCat" + JSON.stringify(groupByTransCat) + "\n");

            // find total spending for parenet category
            // Total spend for W | B | D
            // Go through Child name Category - GROUP
            for (let cat in groupByTransCatChild) {
              if (groupByTransCatChild.hasOwnProperty(cat)) {
                // console.log("\n--Cat Child: " + cat);
                charts.chartParent.chartLabel.push(cat);
                charts.chartParent.chartColor.push(config.randomColor({
                  luminosity: 'light',
                  format: 'hsla',
                  alpha: 0.5
                }));
                // Go through Child Category -GROUP
                let pushD = {
                  dataValueWithdraw: [],
                  dataValueBalance: [],
                  dataValueDeposite: []
                };
                for (let catC in groupByTransCatChild[cat]) {
                  if (groupByTransCatChild[cat].hasOwnProperty(catC)) {
                    pushD.dataValueWithdraw.push(groupByTransCatChild[cat][catC].transactionWithdraw);
                    pushD.dataValueBalance.push(groupByTransCatChild[cat][catC].transactionBalance);
                    pushD.dataValueDeposite.push(groupByTransCatChild[cat][catC].transactionDeposite);
                  }
                }
                charts.chartParent.dataValueWithdraw.push(config.sum(pushD.dataValueWithdraw));
                charts.chartParent.dataValueBalance.push(config.sum(pushD.dataValueBalance));
                charts.chartParent.dataValueDeposite.push(config.sum(pushD.dataValueDeposite));
              }
            }
            // console.log("charts" + JSON.stringify(charts.chartParent));

            // Group by transaCatParent
            let groupByTransCat = groupArray(transactionsInfo, 'transactiontCategoryName');
            // console.log("\n groupByTransCat" + JSON.stringify(groupByTransCat) + "\n");

            // find total spending for parenet category
            // Total spend for W | B | D
            // Go through Parent Category -GROUP
            for (let catP in groupByTransCat) {
              if (groupByTransCat.hasOwnProperty(catP)) {
                // console.log("\n--Cat Parent: " + catP);
                charts.chartChild.chartLabel.push(catP);
                charts.chartChild.chartColor.push(config.randomColor({
                  luminosity: 'light',
                  format: 'hsla',
                  alpha: 0.5
                }));
                // Go through Child Category -GROUP
                let pushD = {
                  dataValueWithdraw: [],
                  dataValueBalance: [],
                  dataValueDeposite: []
                };
                for (let catC in groupByTransCat[catP]) {
                  if (groupByTransCat[catP].hasOwnProperty(catC)) {
                    pushD.dataValueWithdraw.push(groupByTransCat[catP][catC].transactionWithdraw);
                    pushD.dataValueBalance.push(groupByTransCat[catP][catC].transactionBalance);
                    pushD.dataValueDeposite.push(groupByTransCat[catP][catC].transactionDeposite);
                  }
                }
                charts.chartChild.dataValueWithdraw.push(config.sum(pushD.dataValueWithdraw));
                charts.chartChild.dataValueBalance.push(config.sum(pushD.dataValueBalance));
                charts.chartChild.dataValueDeposite.push(config.sum(pushD.dataValueDeposite));
              }
            }
            // console.log("ChartInfo: " + JSON.stringify(chartInfo));
            res.render('statement/review', {
              pageInfo: config.pageInfo,
              dataCat: user.categoryInfo,
              dataSta: statement,
              dataTrans: transactionsInfo,
              charts: charts
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
