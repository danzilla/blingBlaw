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


// Charts for sum of Transactions

  // Category
  //

module.exports.sum = sum;
