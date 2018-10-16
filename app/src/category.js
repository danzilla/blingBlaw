/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it simple
*/
const express = require('express');
const router = express.Router();
const moment = require('moment'); // moment for Time and Date

// auth module
const crudUser = require('./modules/crudUser');
console.log(crudUser.hi()); // test hi

// get - /user
// post - curd
// all - /

// DB collection = Category collection
const collectionName = "usercollection";
// pageInfo detailes
let pageInfo = {
  title: 'Category',
  page: "Dashboard",
  request: "",
  sessionName: ""
}

// Category - Dashboard
// GET - category page
router.get('/', function(req, res, next) {
  // get session info
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "get";
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
    const collection = db.get(collectionName);
    // get all users find()
    collection.find({},{}, function(e, results){
      res.render('category/index', {
        pageInfo: pageInfo,
        data: results
      });
    });
  }
});

//
// POST
// CRUD - Add Update Remove - Category
//

// Add users
// post to add user/add
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
    }
  else { // else - session good - redirect to category list
    // request DB conections
    const db = req.db;
    const collection = db.get(collectionName);
    // set newData to insert
    const newData = {
      userName : req.body.username,
      userPwd : req.body.pwd,
      userDate : moment().format('MMMM Do YYYY, h:mm:ss a')
    };
    // insert newData
    collection.insert(newData, function (err, results){
      if (err) { // If it failed, return error
        res.send("\nError - insert data: " + err);
      } else { // else add user and redirect to Category Dashboard
        res.redirect('/category');
        console.log("Category added: " + results);
        console.log("Active session: " + req.session.user);
      }
    });
  }
});

// Update users
// post to update user/Update
router.post('/update', function(req, res, next) {
  // get session info and set pageInfo
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "post";
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
    const collection = db.get(collectionName);
    // set validation Data
    let valData = { _id: req.body.userId }
    let newData = { // set new data for updae
      userName: req.body.userName,
      userPwd: req.body.userPwd,
      userDate: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    collection.update(valData, { $set: newData}, function(err, results){
      if(err) { // if err throw err
        res.send("Error - updating: " + err);
      } else { //else
        // Uplod good, move to /user
        res.redirect('/category');
        console.log("Category updated: " + JSON.stringify(results));
        console.log("Active session: " + req.session.user);
      }
    });
  }
});

// Remove user
// POST to remove user/remove
router.post('/remove', function(req, res, next) {
  // get session info and set pageInfo
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "post";
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
    const collection = db.get(collectionName);
    let removeUser = { _id: req.body.userId };
    collection.remove(removeUser, function(err, results) {
      if(err) {
        res.send("Error - removing: " + err);
      } else {
        res.redirect('/category');
        console.log("Category removed: " + results);
        console.log("Active session: " + req.session.user);
      }
    });
  }
});



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
