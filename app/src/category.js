/* No Var - let and const
 * try ES6 + async
 * NodeJS + Monk + Session = keep it simple
 */
const express = require('express');
const router = express.Router();
const moment = require('moment'); // moment for Time and Date
var ObjectId = require('mongodb').ObjectID;

// get - /category
// post - curd
// all - /

//randomColor
function randomColor() {
  return "#000000".replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
}

// DB Collections - blingBlaw
const collectionBlingBlaw = "blingBlaw";
// pageInfo detailes
let pageInfo = {
  title: 'Category',
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
// DB Structure
let blingBlaw = {
  _id: "",
  userInfo: {},
  statementInfo: [{}],
  transactionInfo: [{}],
  categoryInfo: [{
    _id: "",
    catName: "",
    catParent: "",
    catCreated: "",
    catModified: ""
  }]
}

// Category - Dashboard
// GET - category page
router.get('/', function(req, res, next) {
  // get session info
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "get";
  pageInfo.active = "active";
  pageInfo.page = "Dashboard";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");
  // if session user is empty
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
  } else { //else
    console.log("Active session: " + req.session.user);
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
        // prepare chart info
        const chartInfo = {
          chartName: "Category and subcategory - diversify",
          chartData: {
            dataLabel: [],
            dataValue: [],
            dataColor: []
          }
        }
        // category chartInfo
        // get Cat in two Arrays
        // go through all category list
        let categoryLenth = user.categoryInfo.length;
        for (let catPSize = 0; catPSize < categoryLenth; catPSize++) {
          // if root - parent category
          if (user.categoryInfo[catPSize].catParent == "root") {
            // push to dataLabel array - catParent
            chartInfo.chartData.dataLabel.push(user.categoryInfo[catPSize].catName);
            chartInfo.chartData.dataColor.push(randomColor());
            let subCatTotal = 0; //set total-subCat
            for (let catCSize = 0; catCSize < user.categoryInfo.length; catCSize++) {
              // subcategory list = parentID
              if (user.categoryInfo[catPSize]._id == user.categoryInfo[catCSize].catParent) {
                // count sub category
                subCatTotal++;
              }
            }
            // push to dataValue - count child array
            chartInfo.chartData.dataValue.push(subCatTotal);
          }
        }
        //console.log("\nchartInfo: " + JSON.stringify(chartInfo2.chartData));
        res.render('category/index', {
          pageInfo: pageInfo,
          data: user.categoryInfo,
          chartInfo: chartInfo
        });
      } else {
        console.log("Session mismatch! - Failed at viewing Category");
        flashData.pageMesage = "Session mismatch, cannot continue - Failed at viewing Category";
        flashData.bgColor = "danger";
        req.flash('flashData', flashData);
        res.redirect('/');
      }
    });
  }
});

//
// POST
// CRUD - Add Update Remove - Category
// mongo.update - PUSH | PULL | SET == Add | remove | update

// Add category
// post to add category/add
router.post('/add', function(req, res, next) {
  // get session info and set pageInfo
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "post";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");
  // if session is undefined - get - login page
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going home\n");
  } else { // else - session good - redirect to category list
    // request DB conections
    const db = req.db;
    const collection = db.get(collectionBlingBlaw);
    // set validation Data
    let valData = {
      "_id": req.session.userId
    }
    // set create category obj
    let categoryInfo = {
      _id: ObjectId(),
      catName: req.body.catName,
      catParent: req.body.catParent,
      catModify: "",
      catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    // mongo push the new category
    collection.update(valData, {
      $push: {
        "categoryInfo": categoryInfo
      }
    }, function(err, results) {
      if (err) { // If it failed, return error
        console.log("err: " + err);
        flashData.pageMesage = "Error Inserting data" + categoryInfo;
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/category');
      } else { // else add category and redirect to Category Dashboard
        console.log("Category added: " + results);
        flashData.pageMesage = "Category been added: " + req.body.username;
        flashData.bgColor = "success";
        flashData.info = results;
        req.flash('flashData', flashData);
        res.redirect('/category');
      }
    });
  }
});

// Update category
// post to update category/Update
router.post('/update', function(req, res, next) {
  // get session info and set pageInfo
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "post";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");
  // if session is undefined - get - login page
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going home\n");
  } else {
    // else - session good - redirect to category list
    // request DB conections
    const db = req.db;
    const collection = db.get(collectionBlingBlaw);
    // set validation Data
    // mongo push the new category
    collection.update({
      _id: req.session.userId,
      "categoryInfo._id": ObjectId(req.body.updateCatId)
    }, {
      $set: {
        "categoryInfo.$.catName": req.body.updateCatName,
        "categoryInfo.$.catParent": req.body.updateCatParent,
        "categoryInfo.$.catModify": moment().format('MMMM Do YYYY, h:mm:ss a')
      }
    }, function(err, results) {
      if (err) { // if err throw err
        flashData.pageMesage = "Error updating data" + JSON.stringify(err);
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/category');
      }
      if (results) {
        if(results.nModified > 0){
          console.log("results: " + JSON.stringify(results));
          flashData.pageMesage = "Category been updated: " + req.body.updateCatName;
          flashData.bgColor = "success";
          flashData.info = results;
          req.flash('flashData', flashData);
          res.redirect('/category');
        } else {
          flashData.pageMesage = "Error updating data: " + req.body.updateCatNam;
          flashData.bgColor = "danger";
          flashData.info = err;
          req.flash('flashData', flashData);
          res.redirect('/category');
        }
      } else { //else
        // Uplod good, move to /category
        console.log("Category updated: ");
        flashData.pageMesage = "Category been updated: " + req.body.updateCatName;
        flashData.bgColor = "success";
        flashData.info = results;
        req.flash('flashData', flashData);
        res.redirect('/category');
      }
    });
  }
});

// Remove Category
// POST to remove category/remove
router.post('/remove', function(req, res, next) {
  // get session info and set pageInfo
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "post";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");
  // if session is undefined - get - login page
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going home\n");
  } else {
    // else - session good - redirect to category list
    // request DB conections
    const db = req.db;
    const collection = db.get(collectionBlingBlaw);
    // set validation Data
    // mongo pull the new category
    collection.update({
      _id: req.session.userId,
      "categoryInfo._id": ObjectId(req.body.removeCat)
    }, {
      $pull: {
        "categoryInfo": {_id: ObjectId(req.body.removeCat)}
      }
    }, function(err, results) {
      if (err) { // if err throw err
        console.log("results: " + JSON.stringify(err));
        flashData.pageMesage = "Error removing data" + JSON.stringify(err.message);
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/category');
      }
      if (results) {
          console.log("results: " + JSON.stringify(results));
          flashData.pageMesage = "Category been removed: " + req.body.removeCat;
          flashData.bgColor = "success";
          flashData.info = results;
          req.flash('flashData', flashData);
          res.redirect('/category');
      }
    });
  }
});




// ALL ROUTE
// ALL add category page
router.all('/add', function(req, res, next) {
  // if session is undefined - get - login page
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
  } else { // else - session good - redirect to user
    // Session active - redirect to /category page
    res.redirect('/category');
    console.log("Active session: " + req.session.user);
  }
});
// ALL update category page
router.all('/update', function(req, res, next) {
  // if session is undefined - get - login page
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
  } else { // else - session good - redirect to user
    // Session active - redirect to /category page
    res.redirect('/category');
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
    // Session active - redirect to /category page
    res.redirect('/category');
    console.log("Active session: " + req.session.user);
  }
});


module.exports = router;
