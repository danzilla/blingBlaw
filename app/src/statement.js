/* No Var - let and const
 * try ES6 + async
 * NodeJS + Monk + Session = keep it simple
 */
const express = require('express');
const router = express.Router();
const moment = require('moment'); // moment for Time and Date
const csvjson = require('csvjson'); //csv to json
const fs = require('fs'); // fs filesystem

// ObjectID - require
const ObjectId = require('mongodb').ObjectID;

const multer = require('multer'); //mlter for file upload
const uploadFolder = multer({
  dest: 'app/uploads/'
}); // upload location app/uploads/

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
let flashData = {
  page: pageInfo.page,
  pageMesage: "",
  info: "",
  bgClass: ""
}

// Statement - Dashboard
// GET - statement page
router.get('/', function(req, res, next) {
  pageInfo.request = "get";
  pageInfo.page = "Dashboard";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");
  // if session user is empty
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
  } else { //else
    // get session info
    pageInfo.sessionName = req.session.user;
    console.log("Active session: " + pageInfo.sessionName);
    // request DB conections
    const db = req.db;
    const collectionSta = db.get(staCollectionName);
    const collectionCat = db.get(catCollectionName);
    // get all categorycollection find()
    collectionCat.find({}, {}, function(eCat, resultsCat) {
      // get all statementCollection find()
      collectionSta.find({}, {}, function(eSta, resultsSta) {
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

// File upload -- /POST -> review - upload
// Post up upload - /statement/upload/
router.post('/review', uploadFolder.single('statementFileInput'), function(req, res, next) {
  // set pageInfo
  pageInfo.request = "post";
  pageInfo.page = "upload & review ";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");
  // if session is undefined - get - login page
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
  } else { // else - session good - procced
    // get session info
    pageInfo.sessionName = req.session.user;
    console.log("Active session: " + pageInfo.sessionName);
    // Upload object - setting up for Statement and transaction
    let uploadInfo = {
      statementInfo: "",
      transactionInfo: []
    };
    // Statement array from GET upload
    let statementInfo = {
      statementName: req.body.statementName,
      statementType: req.body.statementType,
      statementDate: req.body.statementDate,
      statementDesc: req.body.statementDesc,
      statementFileInfo: req.file,
      statementuploadDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
    };
    // set statementInfo
    req.session.statementInfo = statementInfo;
    // inserting to upload object
    uploadInfo.statementInfo = statementInfo;
    // getting CSV to JSON
    let csvFile = req.file.path;
    let csvData = fs.readFileSync(csvFile, {
      encoding: 'utf8'
    });
    let options = {
      delimiter: ',', // optional
      quote: '"' // optional
    };
    // transactionInfo = New array to store json formated transaction
    let csvTransactionInfo = csvjson.toArray(csvData, options);
    for (let i in csvTransactionInfo) {
      // inserting to upload object
      uploadInfo.transactionInfo.push({
        transId: moment(statementInfo.statementDate).format('DDMMMYYYY') + i,
        transDate: csvTransactionInfo[i][0],
        transDesc: csvTransactionInfo[i][1],
        transWithdraw: csvTransactionInfo[i][2],
        transDeposite: csvTransactionInfo[i][3],
        transBalance: csvTransactionInfo[i][4]
      });
    };
    // request DB conections
    const db = req.db;
    const collectionCat = db.get(catCollectionName);
    // get all statementCollection find()
    collectionCat.find({}, {}, function(eCat, resultsCat) {
      res.render('statement/statInfo/reviewTrans/review', {
        pageInfo: pageInfo,
        dataCat: resultsCat,
        uploadInfo: uploadInfo
      });
    });
  }
})

// Post up upload - /statement/upload/
router.post('/upload', function(req, res, next) {
  // get session info and set pageInfo
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "post";
  pageInfo.page = "upload & Data - dev";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");
  // if session is undefined - get - login page
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
  } else { // else - session good - procced
    console.log("Logged in: " + req.session.user);
    // Upload object - setting up for Statement and transaction
    const uploadInfo = {
      uploadUser: req.session.user,
      uploadDate: moment().format('MMMM DD YYYY, h:mm:ss a'),
      statementInfo: req.session.statementInfo,
      transactionInfo: []
    }
    let dataID = req.body.modulesTransId;
    for (let i in dataID) {
      uploadInfo.transactionInfo[i] = {
        transId: ObjectId(),
        transDate: req.body.modulesTransDate[i],
        transDesc: req.body.modulesTransDesc[i],
        transWithdraw: req.body.modulesTransWithdraw[i],
        transDeposite: req.body.modulesTransDeposite[i],
        transBalance: req.body.modulesTransBalance[i],
        transCat: req.body.modulesCatName[i],
        transComment: req.body.modulesTransComment[i]
      }
    };
    // request DB conections
    const db = req.db;
    const collectionSta = db.get(staCollectionName);
    collectionSta.insert(uploadInfo, function(err, results) {
      if (err) { // If it failed, return error
        flashData.pageMesage = "Error uploading file";
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/statement');
        console.log("\nUpload issue\n");
      } else { // Hey! We Added new one!
        flashData.pageMesage = "Statement uploaded!";
        flashData.bgColor = "success";
        req.flash('flashData', flashData);
        res.redirect('/statement');
        console.log("Upload good!");
      }
    });
  }
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
  } else { // else - session good - procced
    console.log("Logged in: " + req.session.user);
    // request DB conections
    const db = req.db;
    const collectionSta = db.get(staCollectionName);
    collectionSta.update({
      "_id": req.body.transStaId,
      "transactionInfo": {
        "$elemMatch": {
          "transDate": req.body.transTransDate,
          "transDesc": req.body.transTransDesc
        }
      }
    }, {
      "$set": {
        "transactionInfo.$.transCat": req.body.transTransCat,
        "transactionInfo.$.transComment": req.body.transTransComment,
      }
    }, function(err, results) {
      if (err) {
        flashData.pageMesage = "Error updating" + req.body.transTransDesc;
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/statement');
      } else {
        console.log(results);
        flashData.pageMesage = "Update been good: " + req.body.transTransDesc;
        flashData.bgColor = "success";
        flashData.info = results;
        req.flash('flashData', flashData);
        res.redirect('/statement');
      }
    })
  }
});
// Remove Statement
// POST to remove statement/remove
router.post('/remove/statement', function(req, res, next) {
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
  } else { // else - session good - redirect to user
    // request DB conections
    const db = req.db;
    const collectionSta = db.get(staCollectionName);
    let removeData = {
      _id: req.body.statementId
    };
    collectionSta.remove(removeData, function(err, results) {
      if (err) {
        flashData.pageMesage = "Error removing" + req.body.statementId;
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/statement');
      } else {
        flashData.pageMesage = "Statement removed: " + req.body.statementId;
        flashData.bgColor = "success";
        flashData.info = results;
        req.flash('flashData', flashData);
        res.redirect('/statement');
        console.log("Statement removed: " + results);
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
