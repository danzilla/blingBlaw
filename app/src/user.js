/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it simple
 */
const express = require('express');
const router = express.Router();
const moment = require('moment'); // moment for Time and Date

var ObjectId = require('mongodb').ObjectID;
// get - /user
// post - curd
// all - /

// pageInfo detailes
let pageInfo = {
  title: 'Users',
  page: "",
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
// DB Collections - blingBlaw
const collectionBlingBlaw = "blingBlaw";
// DB Structure
let blingBlaw = {
  _id: "",
  userInfo: {
    userId: "",
    userFannyPack: "",
    userName: "",
    userPwd: "",
    userEmil: "",
    userGrup: "",
    userCreated: "",
    userModify: ""
  },
  statementInfo: [{
    statement_id: "",
    statementName: "",
    statementType: "",
    statementDate: "",
    statementDesc: "",
    statementFileInfo: "",
    statementCreated: "",
    statementModified: "",
    statementModifiedtUser: ""
  }],
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
  }],
  categoryInfo: [{
    _id: "",
    catName: "",
    catParent: "",
    catCreated: "",
    catModified: ""
  }]
}

let sammpleData = [{
    _id: ObjectId("5be07d20239f616a002cabc2"),
    catName: "Income",
    catParent: "root",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId("5be07d20239f616a002cabc3"),
    catName: "Savings",
    catParent: "root",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId("5be07d20239f616a002cabc4"),
    catName: "Entertainment",
    catParent: "root",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Paycheck",
    catParent: "5be07d20239f616a002cabc2",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Investment",
    catParent: "5be07d20239f616a002cabc2",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Sell",
    catParent: "5be07d20239f616a002cabc2",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Emergency Saving",
    catParent: "5be07d20239f616a002cabc3",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Car Saving",
    catParent: "5be07d20239f616a002cabc3",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Travel Saving",
    catParent: "5be07d20239f616a002cabc3",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "YOLO Saving",
    catParent: "5be07d20239f616a002cabc3",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Events",
    catParent: "5be07d20239f616a002cabc4",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Movies",
    catParent: "5be07d20239f616a002cabc4",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Music",
    catParent: "5be07d20239f616a002cabc4",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Bar",
    catParent: "5be07d20239f616a002cabc4",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Games",
    catParent: "5be07d20239f616a002cabc4",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  }
];

// User - Register
// GET - Register page
router.get('/add', function(req, res, next) {
  // get session info
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "get";
  pageInfo.active = "active";
  pageInfo.page = "register";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");
  console.log("Active session: " + req.session.user);
  res.render('auth/index', {
    pageInfo: pageInfo
  });
});

// User - Dashboard
// GET - user page
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
  } else { // else
    console.log("Active session: " + req.session.user);
    // request DB conections
    const db = req.db;
    const blingBlawCollections = db.get(collectionBlingBlaw);
    // get all users find()
    blingBlawCollections.find({}, {}, function(e, results) {
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
  if (!req.body.username || !req.body.pwd) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going home\n");
  } else { // else - session good - redirect to user
    // request DB conections
    const db = req.db;
    const blingBlawCollections = db.get(collectionBlingBlaw);
    // blingBlaw - collection user with temp category Data
    let user_id = ObjectId();
    let blingBlawUserCreate = {
      _id: user_id,
      userInfo: {
        userId: user_id,
        userFannyPack: req.body.fannyPack,
        userName: req.body.username,
        userPwd: req.body.pwd,
        userEmil: "",
        userGrup: "",
        userModify: "",
        userCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
      },
      statementInfo: [],
      transactionInfo: [],
      categoryInfo: sammpleData
    }
    // create blingBlaw - user
    blingBlawCollections.insert(blingBlawUserCreate, function(err, results) {
      if (err) { // If it failed, return error
        flashData.pageMesage = "Error Inserting data" + newData;
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/user');
      } else { // else add user and redirect to User Dashboard
        console.log("User added: " + results);
        flashData.pageMesage = "User been created! " + req.body.username;
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
  } else { // else - session good - redirect to user
    // request DB conections
    const db = req.db;
    const collection = db.get(collectionBlingBlaw);
    // set validation Data
    let valData = {
      _id: req.body.userId
    }
    // set update user obj
    let blingBlawUpdateUser = {
      "userInfo.userFannyPack": req.body.fannyPack,
      "userInfo.userName": req.body.userName,
      "userInfo.userPwd": req.body.userPwd,
      "userInfo.userEmil": req.body.userEmil,
      "userInfo.userGrup": req.body.userGrup,
      "userInfo.userModify": moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    // mongo update the User
    collection.update(valData, {
      $set: blingBlawUpdateUser
    }, function(err, results) {
      if (err) { // if err throw err
        flashData.pageMesage = "Error updating user: " + req.body.userName;
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/user');
      } else { //else
        // upload good, move to /user
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
  } else { // Else - session good - redirect to user
    // request DB conections
    const db = req.db;
    const collection = db.get(collectionBlingBlaw);
    let removeUser = {
      _id: req.body.userId
    };
    // mongo remove user
    collection.remove(removeUser, function(err, results) {
      if (err) {
        flashData.pageMesage = "Error removing user: " + req.body.userName;
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/user');
      }
      if (results) {
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

module.exports = router;
