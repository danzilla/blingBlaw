var express = require('express');

// Testing Module out
exports.myDateTime1 = function (yolo) {
    return yolo + Date();
};

// Testing Module - hi
exports.hi = function () {
  let msg = `Hi~ BlingBlaw - Budget App -session`;
  return msg;
};

// Testing Module out
exports.session = function (user) {
  if (user == undefined) {
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + user;
    sessionName = user;
    console.log(msg);
  };

};
