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
// randomColors
const randomColor = require('randomcolor');

// collection Name - blingBlaw
const collectionBlingBlaw = "blingBlaw";

// Sum
// Sum array of str->int
const sum = function sum(arrD) {
  let totalSum = 0;
  for (let D in arrD) {
    if (arrD.hasOwnProperty(D)) {
      // turn the string to Int -> if NAN - arr=0
      let arr = parseFloat(arrD[D]) || 0;
      totalSum = parseFloat(arr) + totalSum;
    }
  }
  return totalSum;
}

// Hi
const hi = function hi(arrD) {
  let hi = "Hiiiii!";
  hi = arrD;
  return hi;
}


// Category
// Process Category with parents and colors
const transactionSummary = function transactionSummary(catData, transData, statData) {
  // return summaryData - overall TransactionInfo
  const summaryData = "summaryData!";
  // set categoryInfo
  let categoryInfo = "category!";
  categoryInfo = catData;
  // Loop through Category for parent and identify Sub category
  // Add colors to arrays
  // replace name nada with nada stringify
  let catChild = [];
  let catParent = [];
  for (let cat = 0; cat < categoryInfo.length; cat++) {
    // Add random colors to each categpry parent and Child
    categoryInfo[cat].catColor = randomColor({
      luminosity: 'light',
      format: 'hsla',
      alpha: 0.5
    });
    // category Parent and Child
    if (categoryInfo[cat].catParent === "root") {
      // Parent catParent
      catParent.push(categoryInfo[cat])
    } else {
      // child catChild
      catChild.push(categoryInfo[cat])
    }
  }
  //  print out
  //  console.log("catParent: " + JSON.stringify(catParent));
  //  console.log("catChild: " + JSON.stringify(catChild));

  // Get READY categoryData
  // combine cat+parent to work with transaction
  // how to combine catP with catC
  const categoryData = [];
  // GO through child and look for parent
  for (let catC = 0; catC < catChild.length; catC++) {
    // compare with parentCat ID for match
    for (let catP = 0; catP < catParent.length; catP++) {
      if (catChild[catC].catParent == catParent[catP]._id) {
        // set and get pushD ready
        let pushD = {
          "catId": catChild[catC]._id,
          "catName": catChild[catC].catName,
          "catColor": catParent[catP].catColor,
          "catParent": catParent[catP].catName,
          "catParentId": catParent[catP]._id,
          "catPCId": catChild[catC].catParent,
          "catParentColor": catParent[catP].catColor
        }
        // console.log("category: " + catC + " " + JSON.stringify(pushD));
        categoryData.push(pushD);
      }
    }
  }
  //  console.log("categoryData: " + JSON.stringify(categoryData));


  // Statement and Transaction
  // get Statement ID and compare with Transaction ID
  let statments = "statments!";
  statments = statData;

  // Transaction Info
  // get TransactionInfo
  let transactions = "transaction!";
  transactions = transData;

  for (let trans = 0; trans < transactions.length; trans++) {
    // lol
    // console.log(JSON.stringify(transactions[0].statement_id));
    for (let stat = 0; stat < statments.length; stat++) {

      console.log("sta_Id:" + statments[stat].statement_id);
      console.log("sta_tra_Id:" + transactions[trans].statement_id);


      // cant compare id....
      if (statments[stat].statement_id == transactions[trans].statement_id) {
        console.log("loool");
      }

    }
  }


  // return the categoryData
  return summaryData;
  // console.log("categoryData: " + JSON.stringify(categoryData));
}

// Sum
// Sum array of str->int
const hi2 = function hi2(categoryData, statmentData, transactionData, filterKey) {

  // Organize Category
  // Organize transactions
  // Organize statment
  let categoryInfo = categoryData;
  let statements = statmentData;
  let transactions = transactionData;
  let filterKeys = filterKey;


  console.log("categoryInfo: " + JSON.stringify(categoryInfo));
  console.log("statement: " + JSON.stringify(statement));
  console.log("transactions: " + JSON.stringify(transactions));
  console.log("filterKeys: " + JSON.stringify(filterKeys));

  // Category
  // Category
  // cat = root
  // trans cat = ch
  let catParent = [];
  let catChild = [];
  // Loop through Category for parent and Child category
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
  //  get cat info from transactiontCategory
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

  console.log("transactionsInfo" + JSON.stringify(transactionsInfo));





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
module.exports.transactionSummary = transactionSummary;
