/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();
const moment = require('moment'); // moment for Time and Date
const ObjectId = require('mongodb').ObjectID;

// collection Name - blingBlaw
const collectionBlingBlaw = "blingBlaw";
// pageInfo detailes
let pageInfo = {
  title: 'Login',
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

// flashData
let randomColor = function randomColor() {
  return "#000000".replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
}
//randomColor


module.exports.collectionBlingBlaw = collectionBlingBlaw;
module.exports.pageInfo = pageInfo;
module.exports.flashData = flashData;
module.exports.randomColor = randomColor;
