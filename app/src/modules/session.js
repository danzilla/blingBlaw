var express = require('express');

// Testing Module out
exports.myDateTime1 = function (yolo) {
    return yolo + Date();
};



// Testing Module out
exports.session = function (user) {
  if (req.session.user == undefined) {
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {


    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  };
};
