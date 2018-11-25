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
// pageInfo detailes
let pageInfo = {
  title: "",
  page: "",
  request: "",
  sessionName: ""
}
// flashData
let flashData = {
  page: pageInfo.page,
  pageMesage: "",
  info: "",
  bgColor: ""
}

// randomColor
const randomColor = function randomColor() {
  return "#000000".replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
}


const rainbow =  function rainbow() {
  "use strict";

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return () => {
    var h = randomInt(0, 360);
    var s = randomInt(42, 98);
    var l = randomInt(40, 90);
    return `hsl(${h},${s}%,${l}%)`;
  };
}


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

module.exports.collectionBlingBlaw = collectionBlingBlaw;
module.exports.pageInfo = pageInfo;
module.exports.flashData = flashData;
module.exports.randomColor = randomColor;
module.exports.rainbow = rainbow;
module.exports.sum = sum;
