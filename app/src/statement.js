/* No Var - let and const
 * try ES6 + async
 * NodeJS + Monk + Session = keep it simple
*/
const express = require('express');
const router = express.Router();
const moment = require('moment'); // moment for Time and Date

// get - /statement
// post - curd
// all - /

// DB collection = Statement collection
const collectionName = "statementCollection";
// pageInfo detailes
let pageInfo = {
  title: 'Statement',
  page: "Dashboard",
  request: "",
  sessionName: ""
}

// Statement - Dashboard
// GET - statement page
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
      res.render('statement/index', {
        pageInfo: pageInfo,
        data: results
      });
    });
  }
});

//
// POST
// CRUD - Add Update Remove - Statement
//

// Add statement
// post to add statement/add
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
  else { // else - session good - redirect to statement list
    // request DB conections
    const db = req.db;
    const collection = db.get(collectionName);
    // set newData to insert
    let newData = { // set New data for parent Statement
      catName: req.body.catName,
      catParent: req.body.catParent,
      catAddDate: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    // insert newData
    collection.insert(newData, function (err, results){
      if (err) { // If it failed, return error
        res.send("\nError - insert data: " + err);
      } else { // else add statement and redirect to Statement Dashboard
        res.redirect('/statement');
        console.log("Statement added: " + results);
        console.log("Active session: " + req.session.user);
      }
    });
  }
});

// Update statement
// post to update statement/Update
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
    let valData = { _id: req.body.updateCatId }
    let newData = { // set new data for updae
      catName: req.body.updateCatName,
      catParent: req.body.updateCatParent,
      catAddDate: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    collection.update(valData, { $set: newData}, function(err, results){
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
    let removeData = { _id: req.body.removeCat };
    collection.remove(removeData, function(err, results) {
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
