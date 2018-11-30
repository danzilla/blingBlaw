/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
// Express
const express = require('express');
const router = express.Router();
// moment for Time and Date
const moment = require('moment');
const ObjectId = require('mongodb').ObjectID;

// collection Name - blingBlaw
const collectionBlingBlaw = "blingBlaw";

// Sum
// Sum array of str->int
const sum = function sum(arrD) {

  let hi = "Hiiiii!";
  let totalSum = 0;
  for (let D in arrD) {
    if (arrD.hasOwnProperty(D)) {
      // turn the string to Int -> if NAN - arr=0
      let arr = parseFloat(arrD[D]) || 0;
      totalSum = parseFloat(arr) + totalSum;
    }
  }

  return totalSum;
  return hi;
}



// Sum
// Sum array of str->int
const hi = function hi(arrD) {
  let hi = "Hiiiii!";
  hi = arrD;
  return hi;
}


// Sum
// Sum array of str->int
const hi2 = function hi2(categoryData, statmentData, transactionData, filterKey) {

  let categoryInfo = categoryData;
  let statement = statmentData;
  let transactions = transactionData;
  let filterKeys = filterKey;

  // cat = root
  // trans cat = ch
  let catParent = [];
  let catChild = [];
  // Loop through Category for parent
  // Add colors to arrays
  for (let cat = 0; cat < categoryInfo.length; cat++) {
    if (categoryInfo[cat].catParent === "root") {
      // Parent catParent
      catParent.push(categoryInfo[cat])
    } else {
      // child catChild
      catChild.push(categoryInfo[cat])
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

              console.log("pushD: " + JSON.stringify(pushD));
            }
          }
        }
      }
    }
  }
  console.log("transactionsInfo" + JSON.stringify(transactionsInfo[0]));
  let hi = {
    user: "users",
    category: categoryData,
    statment: statmentData,
    transactions: transactionsInfo,
    filterKey: filterKey
  }
  return hi;
}

// MODULE all charts!!!!!!!


// CHILD CHART


// PARENT CHART


// Transaction desc


// GROUP BY "TAG_NAME"










module.exports.sum = sum;
module.exports.hi = hi;
module.exports.hi2 = hi2;
