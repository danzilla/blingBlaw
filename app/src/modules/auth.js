var express = require('express');
var router = express.Router();


// Testing Module out
exports.crudInfo = function (request) {
  let mesg = "hi from auth";
  return mesg;
};


// Testing Module out
exports.sessionCheck = function (user) {
    var crudInfo = user;
    return crudInfo;
};


// Auto login




// Log off
