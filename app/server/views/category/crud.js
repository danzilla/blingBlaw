var express = require('express');

// Testing Module out
exports.crudInfo = function () {
    var crudInfo = "Crude category loaded!";
    return crudInfo;
};

// categorycollection
//  _id
//  catName
//  catParent
//  catAddDate
//  --- Default ---
/// _id
/// root
var mongo = require("mongo");
var monk = require("monk");
var db = monk("localhost:27017/danustanBling");
var collection = db.get('categorycollection');

// Add category
exports.addDataCat = function (newData) {
  collection.insert(newData, function(err, results) {
    if (err) {console.log("\nNew Cat insert failed data: " + newData + "\nErr : " + err);}
    else {
      console.log("\nNew Cat inserted data: " + newData + "\nResults : " + results);}
  });
};

// Remove category
exports.remDataCat = function (remData) {

  collection.remove(remData, function(err, results) {
    if (err) {console.log("\nCat removefailed data: " + remData + "\nErr : " + err);}
    else {console.log("\nCat removed data: " + remData + "\nresults : " + results);}
  });
};
