/* No Var - let and const
 * try ES6 + async
 * NodeJS + Monk + Session = keep it simple
*/
const express = require('express');
const router = express.Router();
const moment = require('moment'); // moment for Time and Date
const csvjson = require('csvjson'); //csv to json
const fs = require('fs'); // fs filesystem

const multer  = require('multer'); //mlter for file upload
const uploadFolder = multer({ dest: 'app/uploads/' }); // upload location app/uploads/

// get - /statement
// post - curd
// all - /

// DB collectionSta = Statement collectionSta
const staCollectionName = "statementCollection";
const catCollectionName = "categorycollection";
// pageInfo detailes
let pageInfo = {
  title: 'Statement',
  page: "",
  request: "",
  sessionName: ""
}


// Statement - Dashboard
// GET - statement page
router.get('/', function(req, res, next) {
  // get session info
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "get";
  pageInfo.page = "Dashboard";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");
  // if session user is empty
  if(!req.session.user){
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
  } else { //else
    console.log("Active session: " + req.session.user);
    // request DB conections
    const db = req.db;
    const collectionSta = db.get(staCollectionName);
    const collectionCat = db.get(catCollectionName);
    // get all categorycollection find()
    collectionCat.find({},{}, function(eCat, resultsCat){
      // get all statementCollection find()
      collectionSta.find({},{}, function(eSta, resultsSta){
        res.render('statement/index', {
          pageInfo: pageInfo,
          dataCat: resultsCat,
          data: resultsSta
        });
      });
    });
  }
});



//
// POST
// CRUD - Add Update Remove - Statement
//

// Post up upload - /statement/upload/
router.post('/review', uploadFolder.single('statementFileInput'), function (req, res, next) {
  // get session info and set pageInfo
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "post";
  pageInfo.page = "upload & review ";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");
  // if session is undefined - get - login page
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
    }
  else { // else - session good - procced
  // Upload object - setting up for Statement and transaction
    let uploadInfo = {
      statementInfo : "",
      transactionInfo : ""
    };
  // Statement array from GET upload
    let statementInfo = {
      statementName : req.body.statementName,
      statementType : req.body.statementType,
      statementDate : req.body.statementDate,
      statementDesc : req.body.statementDesc,
      statementFileInfo : req.file,
      statementuploadDate : moment().format('MMMM Do YYYY, h:mm:ss a'),
    };
    // inserting to upload object
    uploadInfo.statementInfo = statementInfo;
  // getting CSV to JSON
    let csvFile = req.file.path;
    let csvData = fs.readFileSync(csvFile, {encoding : 'utf8'});
    let options = {
      delimiter : ',', // optional
      quote     : '"' // optional
    };
    // transactionInfo = New array to store json formated transaction
    let transactionInfo = [];
    let csvTransactionInfo = csvjson.toArray(csvData, options);
    for (let i in csvTransactionInfo) {
      transactionInfo[i] = {
        transId: moment(statementInfo.statementDate).format('DDMMMYYYY')+i,
        transDate: csvTransactionInfo[i][0],
        transDesc: csvTransactionInfo[i][1],
        transWithdraw: csvTransactionInfo[i][2],
        transDeposite: csvTransactionInfo[i][3],
        transBalance: csvTransactionInfo[i][4]
      }
    };

    // inserting to upload object
    uploadInfo.transactionInfo = transactionInfo;
    // request DB conections
    const db = req.db;
    const collectionCat = db.get(catCollectionName);
    // get all statementCollection find()
    collectionCat.find({},{}, function(eCat, resultsCat){
      res.render('statement/statInfo/reviewTrans/review', {
        pageInfo: pageInfo,
        dataCat: resultsCat,
        data: "lololo",
        uploadInfo: uploadInfo
      });
    });
  }
})

// Post up upload - /statement/upload/
router.post('/upload', function (req, res, next) {

  console.log("\nreq.body: " + req.body);
  console.log("\nreq.body.uploadInfo: " + req.body.uploadInfo);
  console.log("\nreq.body.modules-transId: " + req.body.modulesTransId);
  console.log("\nreq.body.modules-modulesTransDate: " + req.body.modulesTransDate);
  console.log("\nreq.body.modules-modulesTransDesc: " + req.body.modulesTransDesc);
  console.log("\nreq.body.modules-modulesTransWithdraw: " + req.body.modulesTransWithdraw);
  console.log("\nreq.body.modules-modulesTransDeposite: " + req.body.modulesTransDeposite);
  console.log("\nreq.body.modules-modulesCatName: " + req.body.modulesCatName);

  const uploadData = {
    statementInfo: {
      statementName: req.body.statementName,
      statementType: req.body.statementType,
      statementDate: req.body.statementDate,
      statementDesc: req.body.statementDesc,
      statementuploadDate: req.body.statementuploadDate,
      statementFileInfo: {
        fieldname: req.body.uploadInfo.fieldname,
        originalname: req.body.uploadInfo.originalname,
        encoding: req.body.uploadInfo.encoding,
        mimetype: req.body.uploadInfo.mimetype,
        destination: req.body.uploadInfo.destination,
        filename: req.body.uploadInfo.filename,
        path: req.body.uploadInfo.path,
        size: req.body.uploadInfo.size,
      }
    },
    transactionInfo: {
      transId: req.body.modulesTransId,
      transDate: "",
      transDesc: "",
      transWithdraw: "",
      transDeposite: "",
      transBalance: "",
      transCat: "",
      transComment: ""
    }
  }



console.log("Upload Data: " + JSON.stringify(uploadData));
res.send({"hi":"ok", "req.body": req.body})
/*
  collection.insert(uploadInfo, function (err, results) {
    if (err) { // If it failed, return error
      res.send({err:err});
    }
    else {
      res.render('statement/upload', {
        transactionInfo: transactionInfo,
        statementInfo: statementInfo,
        pageInfo: pageInfo
       });
     }
  });
*/
})






































// Update transaction
// post to update statement/Update
router.post('/update', function(req, res, next) {
  // get session info and set pageInfo
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "post";
  pageInfo.page = "update";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");

  // if session is undefined - get - login page
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
    }
  else { // else - session good - procced
    // request DB conections
    const db = req.db;
    const collectionSta = db.get(staCollectionName);
    // set validation Data
    let valData = { _id: req.body.updateCatId }
    let newData = { // set new data for updae
      catName: req.body.updateCatName,
      catParent: req.body.updateCatParent,
      catAddDate: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    collectionSta.update(valData, { $set: newData}, function(err, results){
      if(err) { // if err throw err
        res.send("Error - updating: " + err);
      } else { //else
        // Uplod good, move to /statement
        res.redirect('/statement');
        console.log("Statement updated: " + JSON.stringify(results));
        console.log("Active session: " + req.session.user);
      }
    });
  }
});

// Remove Statement
// POST to remove statement/remove
router.post('/remove', function(req, res, next) {
  // get session info and set pageInfo
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "post";
  pageInfo.page = "Remove";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");

  // if session is undefined - get - login page
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
    }
  else { // else - session good - redirect to user
    // request DB conections
    const db = req.db;
    const collectionSta = db.get(staCollectionName);
    let removeData = { _id: req.body.removeCat };
    collectionSta.remove(removeData, function(err, results) {
      if(err) {
        res.send("Error - removing: " + err);
      } else {
        res.redirect('/statement');
        console.log("Statement removed: " + results);
        console.log("Active session: " + req.session.user);
      }
    });
  }
});






// ALL ROUTE
// ALL add statement page
router.all('/add', function(req, res, next) {
  // if session is undefined - get - login page
  if (!req.session.user) {
   // if session empty // redirect login page
   res.redirect('/');
   console.log("\nsession incorrect - going Home\n");
  } else { // else - session good - redirect to user
   // Session active - redirect to /statement page
   res.redirect('/statement');
   console.log("Active session: " + req.session.user);
  }
});
// ALL update statement page
router.all('/update', function(req, res, next) {
  // if session is undefined - get - login page
  if (!req.session.user) {
   // if session empty // redirect login page
   res.redirect('/');
   console.log("\nsession incorrect - going Home\n");
  } else { // else - session good - redirect to user
   // Session active - redirect to /statement page
   res.redirect('/statement');
   console.log("Active session: " + req.session.user);
  }
});
// ALL remove page
router.all('/remove', function(req, res, next) {
  // if session is undefined - get - login page
  if (!req.session.user) {
   // if session empty // redirect login page
   res.redirect('/');
   console.log("\nsession incorrect - going Home\n");
  } else { // else - session good - redirect to user
   // Session active - redirect to /statement page
   res.redirect('/statement');
   console.log("Active session: " + req.session.user);
  }
});


module.exports = router;
