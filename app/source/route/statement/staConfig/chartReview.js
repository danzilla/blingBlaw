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


// MODULE all charts!!!!!!!


// CHILD CHART


// PARENT CHART


// Transaction desc


// GROUP BY "TAG_NAME"










module.exports.sum = sum;
module.exports.hi = hi;
