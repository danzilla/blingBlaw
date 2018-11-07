/* No Var - let and const
 * try ES6 + async
 * NodeJS + Monk + Session = keep it simple
 */
const express = require('express');
const router = express.Router();
const moment = require('moment'); // moment for Time and Date
const csvjson = require('csvjson'); //csv to json
const fs = require('fs'); // fs filesystem
// randomColor
const randomColor = require('random-color');
// ObjectID - require
const ObjectId = require('mongodb').ObjectID;
//mlter for file upload
const multer = require('multer');
const uploadFolder = multer({
  dest: 'app/uploads/'
}); // upload location app/uploads/

// get - /statement
// post - curd
// all - /
// DB collectionSta = Statement collectionSta
const staCollectionName = "statementCollection";
const catCollectionName = "categorycollection";
// DB Collections - blingBlaw
const collectionBlingBlaw = "blingBlaw";
// DB Structure
let blingBlaw = {
  _id: "",
  userInfo: {},
  statementInfo: [{
    statement_id: "",
    statementName: "",
    statementType: "",
    statementDate: "",
    statementDesc: "",
    statementFileInfo: "",
    statementCreated: "",
    statementModified: "",
    statementModifiedtUser: "",
    transactionInfo: [{
      transactionId: "",
      transactionDate: "",
      transactionDesc: "",
      transactionWithdraw: "",
      transactionDeposite: "",
      transactionBalance: "",
      transactiontModified: "",
      transactiontModifiedUser: "",
      statement_id: ""
    }]
  }],
  categoryInfo: [{}]
}
// pageInfo detailes
let pageInfo = {
  title: 'Statement',
  page: "",
  request: "",
  sessionName: "",
  active: ""
}
let flashData = {
  page: pageInfo.page,
  pageMesage: "",
  info: "",
  bgColor: ""
}

// Statement - Dashboard
// GET - statement page
router.get('/', function(req, res, next) {
  pageInfo.request = "get";
  pageInfo.page = "Dashboard";
  pageInfo.active = "active";
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

    // ATTENTION!! NEED TO BE WORK ON SEARCH oR OPTIONS AND CASES
    const navOptions = {
      viewAll: "all",
      viewByMonth: "",
      viewByYear: "",
      viewByAttention: "",
      viewByName: ""
    }
    // request DB conections
    const db = req.db;
    const collectionBling = db.get(collectionBlingBlaw);
    collectionBling.findOne({
      "userInfo.userName": req.session.user
    }, function(err, user) {
      if (err) {
        console.log("\nerror: " + JSON.stringify(err));
      }
      if (user) {
        // category
        // get Cat in two Arrays
        // for ease of use... - need better way
        let categories = user.categoryInfo;
        const catParentArray = [];
        const catChildArray = [];
        for (cat in categories) {
          // Parent Category
          if (categories[cat].catParent == "root") {
            let pushD = {
              _id: categories[cat]._id,
              catName: categories[cat].catName,
              catParent: categories[cat].catParent,
              catAddDate: categories[cat].catAddDate
            }
            catParentArray.push(pushD);
          }
          // Child Category
          if (categories[cat].catParent !== "root") {
            let pushD = {
              _id: categories[cat]._id,
              catName: categories[cat].catName,
              catParent: categories[cat].catParent,
              catAddDate: categories[cat].catAddDate
            }
            catChildArray.push(pushD);
          }
        }
        // transaction
        // ready transaction to find catParentName from catParentID - catParentArray
        const transInfo = [];
        for (sta in user.statementInfo) {
          for (let tra = 0; tra < user.statementInfo[sta].transactionInfo.length; tra++) {
            // set up pushD for transInfo
            let pushD = {
              transId: user.statementInfo[sta].transactionInfo[tra].transId,
              transDate: user.statementInfo[sta].transactionInfo[tra].transDate,
              transType: user.statementInfo[sta].transactionInfo[tra].transType,
              transaction: "",
              transCat: "",
              catParent: "",
              transCatId: "",
              catParentId: ""
            }
            // if the category is not empty or nada - add catname and transaction
            if (user.statementInfo[sta].transactionInfo[tra].transCat !== "nada" &&
              user.statementInfo[sta].transactionInfo[tra].transCat !== "") {
              // if deposite and NOT nada - add transCat
              if (user.statementInfo[sta].transactionInfo[tra].transDeposite) {
                pushD.transaction = user.statementInfo[sta].transactionInfo[tra].transDeposite;
              }
              // if withdraw and NOT nada
              if (user.statementInfo[sta].transactionInfo[tra].transWithdraw) {
                pushD.transaction = user.statementInfo[sta].transactionInfo[tra].transWithdraw;
              }
              // category names for parent and child category
              for (catC in catChildArray) {
                if (user.statementInfo[sta].transactionInfo[tra].transCat == catChildArray[catC]._id) {
                  // push CatID to transInfo - Child
                  pushD.transCat = catChildArray[catC].catName;
                  pushD.transCatId = user.statementInfo[sta].transactionInfo[tra].transCat;
                  // push CatID to transInfo - Parent
                  for (catP in catParentArray) {
                    if (catParentArray[catP]._id == catChildArray[catC].catParent) {
                      pushD.catParent = catParentArray[catP].catName;
                      pushD.catParentId = catParentArray[catP]._id;
                    }
                  }
                }
              }
            }
            // if the category is empty or undefined or nada - add nada and transaction
            if (user.statementInfo[sta].transactionInfo[tra].transCat == "nada" ||
              user.statementInfo[sta].transactionInfo[tra].transCat == "" ||
              user.statementInfo[sta].transactionInfo[tra].transCat == "undefined") {
              if (user.statementInfo[sta].transactionInfo[tra].transDeposite) {
                //if deposite and NOT nada - add transCat
                pushD.transCat = "nada"
                pushD.catParent = "nada"
                pushD.transaction = user.statementInfo[sta].transactionInfo[tra].transDeposite
              }
              if (user.statementInfo[sta].transactionInfo[tra].transWithdraw) {
                //if withdraw and IS nada - add nada to cat
                pushD.transCat = "nada"
                pushD.catParent = "nada"
                pushD.transaction = user.statementInfo[sta].transactionInfo[tra].transWithdraw
              }
            }
            transInfo.push(pushD);
          }
        }
        // group by catParent
        // group and SUM - group catNames and sum transaction
        // need to tune this up
        let resultGroupSum = [];
        transInfo.reduce(function(res, value) {
          if (!res[value.catParent]) {
            res[value.catParent] = {
              catParent: value.catParent,
              catParentId: value.catParentId,
              transaction: 0
            };
            resultGroupSum.push(res[value.catParent])
          }
          res[value.catParent].transaction += parseFloat(value.transaction)
          return res;
        }, {});
        // console.log(JSON.stringify(resultGroupSum));
        // chartData
        // append data into chartInfo
        const chartInfo = {
          chartName: "Statement overview: <statmentName>",
          chartData: {
            dataLabel: [],
            dataValue: [],
            dataParentId: [],
            dataColor: []
          }
        }
        for (charD in resultGroupSum) {
          let color = randomColor();
          chartInfo.chartData.dataLabel.push(resultGroupSum[charD].catParent)
          chartInfo.chartData.dataValue.push(resultGroupSum[charD].transaction.toFixed(2))
          chartInfo.chartData.dataParentId.push(resultGroupSum[charD].catParentId)
          chartInfo.chartData.dataColor.push(color.hexString())
        }
        // console.log("\ncatParentArray: " + JSON.stringify(catParentArray));
        // console.log("\ncatChildArray: " + JSON.stringify(catChildArray));
        // console.log("\nstatementInfo: " + JSON.stringify(user.statementInfo[0].statementData));
        // console.log("\ntransactionInfo: " + JSON.stringify(user.statementInfo.transactionInfo));
        res.render('statement/index', {
          pageInfo: pageInfo,
          dataCat: user.categoryInfo,
          data: user.statementInfo,
          chartInfo: chartInfo
        });
      } else {
        console.log("Session mismatch! - Failed at view Statement");
        flashData.pageMesage = "Session mismatch, cannot continue - Failed at viewing Statement";
        flashData.bgColor = "danger";
        req.flash('flashData', flashData);
        res.redirect('/');
      }
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
  } else {
    // request DB conections
    const db = req.db;
    const collectionBling = db.get(collectionBlingBlaw);
    collectionBling.findOne({
      "userInfo.userName": req.session.user
    }, function(err, user) {
      if (err) {
        console.log("\nerror: " + JSON.stringify(err));
      }
      if (user) {
        // else - session good - procced
        // get session info
        pageInfo.sessionName = req.session.user;
        console.log("Active session: " + pageInfo.sessionName);
        // Upload object - setting up for Statement and transaction
        // Statement array from GET upload
        let statementInfo = {
          statement_id: ObjectId(),
          statementName: req.body.statementName,
          statementType: req.body.statementType,
          statementDate: req.body.statementDate,
          statementDesc: req.body.statementDesc,
          statementFileInfo: req.file,
          statementCreated: moment().format('MMMM Do YYYY, h:mm:ss a'),
          statementModified: "",
          statementModifiedtUser: "",
          transactionInfo: []
        };
        // set statementInfo
        req.session.statementInfo = statementInfo;
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
          statementInfo.transactionInfo.push({
            transId: moment(statementInfo.statementDate).format('DDMMMYYYY') + i,
            transDate: csvTransactionInfo[i][0],
            transDesc: csvTransactionInfo[i][1],
            transWithdraw: csvTransactionInfo[i][2],
            transDeposite: csvTransactionInfo[i][3],
            transBalance: csvTransactionInfo[i][4],
            uploadUser: req.session.user
          });
        };
        let categories = user.categoryInfo;
        res.render('statement/statInfo/reviewTrans/review', {
          pageInfo: pageInfo,
          dataCat: categories,
          statementInfo: statementInfo
        });
      } else {
        console.log("Session mismatch! - Failed at view - review");
        flashData.pageMesage = "Session mismatch, cannot continue - Failed at viewing - review";
        flashData.bgColor = "danger";
        req.flash('flashData', flashData);
        res.redirect('/');
      }
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
  } else {
     // else - session good - procced
     console.log("Active session: " + req.session.user);
    // Upload object - setting up for Statement and transaction
    let statementInfo = {
      statement_id: req.session.statementInfo.statement_id,
      statementName: req.session.statementInfo.statementName,
      statementType: req.session.statementInfo.statementType,
      statementDate: req.session.statementInfo.statementDate,
      statementDesc: req.session.statementInfo.statementDesc,
      statementFileInfo: req.session.statementInfo.statementFileInfo,
      statementCreated: req.session.statementInfo.statementCreated,
      statementModified: req.session.statementInfo.statementModified,
      statementModifiedtUser: req.session.statementInfo.statementModifiedtUser,
      transactionInfo: []
    }
    for (let i in req.body.modulesTransId) {
      statementInfo.transactionInfo[i] = {
        transactionId: ObjectId(),
        transDate: req.body.modulesTransDate[i],
        transDesc: req.body.modulesTransDesc[i],
        transWithdraw: req.body.modulesTransWithdraw[i],
        transDeposite: req.body.modulesTransDeposite[i],
        transBalance: req.body.modulesTransBalance[i],
        transCat: req.body.modulesCatName[i],
        transComment: req.body.modulesTransComment[i],
        transType: req.body.modulesTransType[i],
        statementId: req.session.statementInfo.statement_id,
        transactiontModified: "",
        transactiontModifiedUser: ""
      }
    };
    // set validation Data
    let valData = {
      "_id": req.session.userId
    }
    // request DB conections
    const db = req.db;
    const collectionBling = db.get(collectionBlingBlaw);
    // mongo push the new category
    collectionBling.update(valData, {
      $push: {
        "statementInfo": statementInfo
      }
    }, { upsert : true }, function(err, results) {
      if (err) { // If it failed, return error
        console.log("err: " + err);
        flashData.pageMesage = "Error adding Statement";
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/statement');
      } else { // else add category and redirect to Category Dashboard
        console.log("Category added: " + results);
        flashData.pageMesage = "Statement been added!";
        flashData.bgColor = "success";
        flashData.info = results;
        req.flash('flashData', flashData);
        res.redirect('/statement');
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
      "_id": req.session.userId,
      "statementInfo.transactionInfo": {
        "$elemMatch": {
          "transactionId": req.body.transTransId,
          "transDate": req.body.transTransDate,
          "transDesc": req.body.transTransDesc
        }
      }
    }, {
      "$set": {
        "statementInfo.$.transCat": req.body.transTransCat,
        "statementInfo.$.transComment": req.body.transTransComment,
        "statementInfo.$.transactiontModified": req.body.transTransComment,
        "statementInfo.$.transactiontModifiedUser": moment().format('MMMM Do YYYY, h:mm:ss a')
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
    const collection = db.get(collectionBlingBlaw);
    // set validation Data
    // mongo pull the new category

    console.log("\n\nasdsa: " + req.body.statementId);
    collection.update({
      "statementInfo.statementData.statement_id": ObjectId('5be32b29ee4c322140969fd5')
    }, {
      $pull: {
        "statementInfo.statementData": { 'statement_id': ObjectId('5be32b29ee4c322140969fd5')}
      }
    }, function(err, results) {
      if (err) { // if err throw err
        console.log("results: " + JSON.stringify(err));
        flashData.pageMesage = "Error removing statement" + JSON.stringify(err.message);
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/statement');
      }
      if (results) {
          console.log("results: " + JSON.stringify(results));
          flashData.pageMesage = "Statement been removed: " + req.body.statementId;
          flashData.bgColor = "success";
          flashData.info = results;
          req.flash('flashData', flashData);
          res.redirect('/statement');
      }
    });





/*



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
        flashData.bgColor = "warning";
        flashData.info = results;
        req.flash('flashData', flashData);
        res.redirect('/statement');
        console.log("Statement removed: " + results);
      }
    });



*/



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
