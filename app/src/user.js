/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it simple
*/
const express = require('express');
const router = express.Router();
const moment = require('moment'); // moment for Time and Date

// get - /user
// post - curd
// all - /

// DB collection = User collection
const collectionName = "usercollection";
// pageInfo detailes
let pageInfo = {
  title: 'Users',
  page: "Dashboard",
  request: "",
  sessionName: "",
  active: ""
}
let flashData = {
  page: pageInfo.page,
  pageMesage: "",
  info: "",
  bgClass: ""
}


// User - Dashboard
// GET - user page
router.get('/', function(req, res, next) {
  // get session info
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "get";
  pageInfo.active = "active";
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
      res.render('user/index', {
        pageInfo: pageInfo,
        data: results
      });
    });
  }
});

//
// POST
// CRUD - Add Update Remove - Users
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
  else { // else - session good - redirect to user
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
        flashData.pageMesage = "Error Inserting data" + newData;
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/user');
      } else { // else add user and redirect to User Dashboard
        console.log("User added: " + results);
        flashData.pageMesage = "User been added: " + req.body.username;
        flashData.bgColor = "success";
        flashData.info = results;
        req.flash('flashData', flashData);
        res.redirect('/user');
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
        flashData.pageMesage = "Error updating user: " + req.body.userName;
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/user');
      } else { //else
        // Uplod good, move to /user
        flashData.pageMesage = "User been updated: " + req.body.userName;
        flashData.bgColor = "success";
        flashData.info = results;
        req.flash('flashData', flashData);
        res.redirect('/user');
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
        flashData.pageMesage = "Error removing user: " + req.body.userName;
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/user');
      } else {
        // Uplod good, move to /user
        flashData.pageMesage = "User been removed: " + req.body.userName;
        flashData.bgColor = "warning";
        flashData.info = results;
        req.flash('flashData', flashData);
        res.redirect('/user');
      }
    });
  }
});









// ALL add user page
router.all('/add', function(req, res, next) {
  // if session is undefined - get - login page
  if (!req.session.user) {
   // if session empty // redirect login page
   res.redirect('/');
   console.log("\nsession incorrect - going Home\n");
  } else { // else - session good - redirect to user
   // Session active - redirect to /user page
   res.redirect('/user');
   console.log("Active session: " + req.session.user);
  }
});
// ALL update user page
router.all('/update', function(req, res, next) {
  // if session is undefined - get - login page
  if (!req.session.user) {
   // if session empty // redirect login page
   res.redirect('/');
   console.log("\nsession incorrect - going Home\n");
  } else { // else - session good - redirect to user
   // Session active - redirect to /user page
   res.redirect('/user');
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
   // Session active - redirect to /user page
   res.redirect('/user');
   console.log("Active session: " + req.session.user);
  }
});


module.exports = router;
