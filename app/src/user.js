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

// pageInfo detailes
let pageInfo = {
  title: 'Users',
  page: "Dashboard",
  request: "",
  sessionName: ""
}
// User - Dashboard
// GET - user page
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
    const collection = db.get('usercollection');
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
    const collection = db.get('usercollection');
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
      } else { // else add user and redirect to User Dashboard
        res.redirect('/user');
        console.log("User added: " + results);
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
    const collection = db.get('usercollection');
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
        res.redirect('/user');
        console.log("User updated: " + JSON.stringify(results));
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
    const collection = db.get('usercollection');
    let removeUser = { _id: req.body.userId };
    collection.remove(removeUser, function(err, results) {
      if(err) {
        res.send("Error - removing: " + err);
      } else {
        res.redirect('/user');
        console.log("User removed: " + results);
        console.log("Active session: " + req.session.user);
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
