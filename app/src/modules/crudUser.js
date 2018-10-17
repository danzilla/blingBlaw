var express = require('express');
var router = express.Router();

// DB connections
var mongo = require("mongo");
var monk = require("monk");
var db = monk("localhost:27017/danustanBling");
var collection = db.get('usercollection');

// Testing Module - hi
exports.hi = function () {
  let msg = "\nHi~ BlingBlaw - Budget App";
  return msg;
};
