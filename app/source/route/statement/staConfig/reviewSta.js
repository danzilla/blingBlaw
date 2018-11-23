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

            function myFunction(p1, p2) {
              return p1 * p2;
            }






            console.log("myFunction(4, 3)" + myFunction(4, 3));


            // let groupByTranasCatLabel = Object.keys(groupByTransCat);
            // console.log("groupByTranasCatLabel: " + groupByTranasCatLabel);
            // console.log("\groupByTransCat: " + JSON.stringify(groupByTransCat));

            // Group by transaCatParent
            let groupByTransCat = groupArray(transactionsInfo, 'transactiontCategoryParentName');
            // console.log("\n groupByTransCat" + JSON.stringify(groupByTransCat) + "\n");

            // Chart label === Category child - Parents
            // Chart data === Category child - SUM
            // Chart Color === randomColor

            function sum(arrE){
              for (let D in arrE) {
                if (arrE.hasOwnProperty(D)) {
                  arrE[D] = parseFloat(arrE[D]) || 0;
                  arrE[D] + arrE[D];
                  return arrE[D]
                }
              }
            }

            // prepare chart info
            const chartParent = {
              chartName: "Spending by Category",
              dataLabel: [],
              dataColor: [],
              dataValue: []
            }
            // find total spending for parenet category
            // Total spend for W | B | D
            // Go through Parent Category -GROUP
            let chartD = [];
            for (let catP in groupByTransCat) {
              if (groupByTransCat.hasOwnProperty(catP)) {
                // label for Chart - cat parent
                chartParent.dataLabel.push(catP)
                // Color for each catParent
                chartParent.dataColor.push(config.randomColor())
                // Go through Child Category -GROUP
                console.log("\n--Cat Parent: " + catP);
                let chartData = {
                  labelName: catP,
                  labelColor: config.randomColor(),
                  dataValueWithdraw: [],
                  dataValueBalance: [],
                  dataValueDeposite: [],
                  dataChild: [],
                  dataDesc: []
                }
                let pushD = [];
                for (let catC in groupByTransCat[catP]) {
                  if (groupByTransCat[catP].hasOwnProperty(catC)) {

                    chartData.dataValueWithdraw.push(groupByTransCat[catP][catC].transactionWithdraw);
                    chartData.dataValueBalance.push(groupByTransCat[catP][catC].transactionBalance);
                    chartData.dataValueDeposite.push(groupByTransCat[catP][catC].transactionDeposite);

                    chartData.dataChild.push(groupByTransCat[catP][catC].transactiontCategoryName);
                    chartData.dataDesc.push(groupByTransCat[catP][catC].transactionDesc);

                    pushD.push(groupByTransCat[catP][catC].transactionWithdraw);

                    console.log("\nCat Child: " + groupByTransCat[catP][catC].transactiontCategoryName);
                    console.log("-Cat Parent: " + groupByTransCat[catP][catC].transactiontCategoryParentName);
                    console.log("-Cat Desc: " + groupByTransCat[catP][catC].transactionDesc);
                    console.log("-Cat Withdraw: " + groupByTransCat[catP][catC].transactionWithdraw);
                    console.log("-Cat Balance: " + groupByTransCat[catP][catC].transactionBalance);
                    console.log("-Cat Deposite: " + groupByTransCat[catP][catC].transactionDeposite);
                  }
                }


                console.log("\nLOOOL: " + JSON.stringify(chartData));

                for (var D in pushD) {
                  if (pushD.hasOwnProperty(D)) {
                    pushD[D] = parseFloat(pushD[D]) || 0;
                    pushD[D] =+ pushD[D];
                  }
                }
                console.log("pushD[D]: " + pushD[D]);

                console.log("dataValueWithdraw " + sum(chartData.dataValueWithdraw));
                console.log("dataValueBalance " + sum(chartData.dataValueBalance));
                console.log("dataValueDeposite " + sum(chartData.dataValueDeposite));



              }
            }

            console.log("\nChart: " + chartParent.chartName);
            console.log("label: " + chartParent.dataLabel);
            console.log("Color: " + chartParent.dataColor);
            console.log("Value: " + chartParent.dataValue);

            [{
              "transactionId": "5bf5b1601540321a404d9585",
              "transactionDate": "07/12/2018",
              "transactionDesc": "PAYMENT - THANK YOU",
              "transactionWithdraw": "",
              "transactionDeposite": "200.00",
              "transactionBalance": "-4.07",
              "transactiontCategory": "5bf5b10c1540321a404d9569",
              "transactiontCategoryName": "Investment",
              "transactiontCategoryParent": "5be07d20239f616a002cabc2",
              "transactiontCategoryParentName": "Income",
              "transactiontModified": "November 22nd 2018, 2:22:38 pm",
              "transactiontModifiedUser": "123",
              "statement_id": "5bf5b1601540321a404d9582",
              "statementName": "123123",
              "statementType": "saving",
              "statementDate": "2018-10-31",
              "statementCreated": "November 21st 2018, 2:26:24 pm"
            }]

            // chartData
            res.render('statement/review', {
              pageInfo: config.pageInfo,
              dataCat: user.categoryInfo,
              dataSta: statement,
              dataTrans: transactions,
              chartInfo: chartParent
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
