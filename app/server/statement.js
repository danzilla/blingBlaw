var express = require('express');
var moment = require('moment');
var csvjson = require('csvjson');
var fs = require('fs');

var router = express.Router();

// statement
//  - statementInfo
//  - transactionInfo
//  - dateAdded

/* GET statement page */
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

  var db = req.db;
  var collection = db.get('statementCollection');
  var collectionCat = db.get('categorycollection');

  //collection.find({ }, function(e, statementResult){ console.log("\nstatementResult: " + JSON.stringify(statementResult)); });
  //collectionCat.find({ }, function(e, collectionCatResult){ console.log("\ncollectionCatResult: " + JSON.stringify(collectionCatResult)); });

  collectionCat.find({ }, function(err, collectionCatResult) {
    collection.find({ }, function(e, statementResult){

     var pageInfo = {
       title: 'Statements',
       page: "Dashboard",
       request: "get",
       sessionName: sessionName,
       categoryInfo: collectionCatResult
     };

     res.render('statement/index', { // statement/index
       pageInfo: pageInfo,
       statement: statementResult,
       categoryInfo: pageInfo.categoryInfo
     });
    });

   });

});



/* GET upload page */
router.get('/transaction/update', function(req, res, next) {
  if(req.session.user == undefined){
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  }

  console.log("\nHi from Trans update Service - GET\n");
  res.redirect('/statement');
});

/* GET upload page */
router.post('/transaction/update', function(req, res, next) {
  if(req.session.user == undefined){
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  }


  var transUpdate = {
    statementID : req.body.statementID,
    transId : req.body.transId
  };

  var db = req.db;
  var collection = db.get('statementCollection');
  //collection.find({ }, function(e, statementResult){ console.log("\nstatementResult: " + JSON.stringify(statementResult)); });

  collection.update(
   {
     _id: req.body.statementID,
     transactionInfo: {transId: req.body.transId}
    },
   {
     transactionInfo: { "category": "asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" }
   }, function(e, results){
     if(e){ console.log("\nSomething with update error: " + e);}
     else{
       console.log("Update is good: " + (results));
     }
   });

   collection.findAndModify({
    query: { _id: req.body.statementID },
    sort: { rating: 1 },
    update: { $inc: { score: 1 } },
    upsert: true
  })

  console.log("\nTrans update \n statementID: " + transUpdate.statementID + "\n transId: " + transUpdate.transId + "\n");
  console.log("\nHi from Trans update Service\n");
  res.redirect('/statement');
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
    title: 'Statements',
    page: "upload new",
    request: "get",
    sessionName: sessionName
  }
  res.render('statement/upload', {
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

  // Upload object - setting up for Statement and transaction
  var uploadInfo = {
    statementInfo : "statementInfo",
    uploadDate : moment().format('MMMM Do YYYY, h:mm:ss a'),
    transactionInfo : "transactionInfo"
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
  };
  uploadInfo.transactionInfo = transactionInfo; // inserting to upload object

  if(transactionInfo){console.log("good transactionInfo!");}
  if(statementInfo){console.log("good statementInfo!");}
  var db = req.db;
  var collection = db.get('statementCollection');
  // statementCollection
  //  - dateAdded
  //  - statementInfo
  //  - transactionInfo
  // Submit to the DB
  collection.insert(uploadInfo, function (err, results) {
    if (err) { // If it failed, return error
      res.send("Problem adding the info to the database.");
      console.log("Problem adding the info to the database.");
    }
    else { // Hey! We Added new one!
      console.log("\nStatement been added!");
      console.log("Date info: " + results.statementInfo.statementDate);
      console.log("Statement info: " + results.statementInfo.statementName);
      console.log("Transaction info: " + uploadInfo.transactionInfo);

      var pageInfo = {
        title: 'Statements',
        page: "upload Sucess!",
        request: "post",
        sessionName: sessionName
      }
      res.render('statement/upload', {
        transactionInfo: transactionInfo,
        statementInfo: statementInfo,
        pageInfo: pageInfo
       });
     }
  });
});






// Remove user
// GET to remove user/remove Service
router.get('/remove', function(req, res) {
  if (req.session.user == undefined) {
      var msg = "Session is empty";
      sessionName = "Session is Empty";
      console.log(msg);
    } else {
      var msg = "Session is active, user: " + req.session.user;
      sessionName = req.session.user;
      console.log(msg);
    }

  console.log("\n GET REMOVE \n");
  res.redirect('/statement');
});




// POST to remove user/remove Service
router.post('/remove', function(req, res) {
  if(req.session.user == undefined){
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  }

  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('statementCollection');
  var removeStatement = {
    _id: req.body.statementID
  };
  collection.remove(removeStatement, function(err, results) {
      if (err){
        res.send("Problem removing ID: " + removeStatement._id);
        console.log("Problem removing ID: " + removeStatement._id);
      } else {
        console.log("Info been Removed! ID: " + removeStatement._id);

        var pageInfo = {
          title: "Statements",
          page: "removed!",
          request: "post",
          sessionName: sessionName
        }
        collection.find({},{}, function(e, statementResults){
          res.render('statement/index', {
            pageInfo: pageInfo,
            statement: statementResults
          });
        })
      }
   });
 });





module.exports = router;
