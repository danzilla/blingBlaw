var express = require('express');
var moment = require('moment');
var csvjson = require('csvjson');
var fs = require('fs');

var router = express.Router();

// statement
//  - statementInfo
//  - transactionInfo
//  - dateAdded

/* GET login page */
router.get('/', function(req, res, next) {
  if(req.session.user == undefined){
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  }

  var pageInfo = {
    title: 'Transaction',
    page: "Dashboard",
    request: "get",
    sessionName: sessionName
  }
  var db = req.db;
  var collection = db.get('statementCollection');
  collection.find({ }, function(e, transactionResult){
    res.render('transaction/view', { // user/view
      pageInfo: pageInfo,
      transaction: transactionResult
    });
  });
});

/* GET upload page */
router.get('/upload', function(req, res, next) {
  if(req.session.user == undefined){
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  }

  var pageInfo = {
    title: 'upload',
    page: "page GET",
    request: "get",
    sessionName: sessionName
  }
  res.render('transaction/upload', {
    pageInfo: pageInfo,
   });
});


/* POST home page. */
router.post('/upload', function(req, res, next) {
  if(req.session.user == undefined){
    var msg = "Session is empty";
    sessionName = "Session is Empty!";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  }

  if (req.body.submitMode === "self"){
    console.log("YO N");
    console.log(statementInfo);
  } else {
    // Upload object - setting up for Statement and transaction
    var uploadInfo = {
      statementInfo : "statementInfo",
      transactionInfo : "transactionInfo",
      uploadDate : moment().format('MMMM Do YYYY, h:mm:ss a')
    };
    // Statement array from GET upload
    var statementInfo = {
      statementName : req.body.statementName,
      statementType : req.body.statementType,
      statementDate : req.body.statementDate,
      statementDesc : req.body.statementDesc,
      statementFileInput : req.body.statementFileInput
    };
    uploadInfo.statementInfo = statementInfo; // inserting to upload object
    // getting CSV to JSON
    var csvFile = statementInfo.statementFileInput;
    var csvData = fs.readFileSync(csvFile, { encoding : 'utf8'});
    var options = {
      delimiter : ',', // optional
      quote     : '"' // optional
    };
    // transactionInfo = New array to store json formated transaction
    var transactionInfo = [];
    var csvTransactionInfo = csvjson.toArray(csvData, options);
    for (var i in csvTransactionInfo) {
      transactionInfo[i] = {
        transId: i,
        transDate: csvTransactionInfo[i][0],
        transDesc: csvTransactionInfo[i][1],
        transWithdraw: csvTransactionInfo[i][2],
        transDeposite: csvTransactionInfo[i][3],
        transBalance: csvTransactionInfo[i][4]
      }
    }
    uploadInfo.transactionInfo = transactionInfo; // inserting to upload object
  }


  if(transactionInfo){console.log("good transactionInfo!");}
  if(statementInfo){console.log("good statementInfo!");}

  var db = req.db;
  var collection = db.get('statementCollection');
  // statementCollection
  //  - statementInfo
  //  - transactionInfo
  //  - dateAdded
  // Submit to the DB
  collection.insert(uploadInfo, function (err, results) {
    if (err) { // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else { // Hey! We Add new one!
      console.log(results);
      console.log("DB GOOD TO Insert");
    }
  });

  var pageInfo = {
    title: 'upload',
    page: "page POST",
    request: "post",
    sessionName: sessionName
  }
  res.render('transaction/upload', {
    transactionInfo: transactionInfo,
    statementInfo: statementInfo,
    pageInfo: pageInfo
   });
});


module.exports = router;
