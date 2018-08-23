var express = require('express');
var moment = require('moment');

var router = express.Router();

var crudCat = require('./views/category/crud');
console.log(crudCat.crudInfo());

// DB
var mongo = require("mongo");
var monk = require("monk");
var db = monk("localhost:27017/danustanBling");
var collection = db.get('categorycollection');

// Category - root
// GET - category - Category root page
router.get('/', function(req, res, next) {

  if (req.session.user == undefined) {
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
    res.redirect('/');
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  }

  // DB collection find
  collection.find({}, {}, function(e, results) {
    var pageInfo = {
      title: 'Category',
      page: "Dashboard",
      request: "get",
      sessionName: sessionName
    }
    res.render('category/index', {
      pageInfo: pageInfo,
      categoryInfo: results
    });
  });

});
// Category - root
// POST - category - Insert new Category
router.post('/', function(req, res) {

  if (req.session.user == undefined) {
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  }
  // categorycollection
  //  _id
  //  catName
  //  catParent
  //  catAddDate
  if (req.body.catParent === "root"){ // root category
    // Insert data into category
    var newData = {
      catName: req.body.catName,
      catParent: req.body.catParent,
      catAddDate: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    crudCat.addDataCat(newData);
    // Page render info category/index
    var pageInfo = {
      title: 'Category',
      page: "added!",
      request: "post",
      sessionName: sessionName
    }
    collection.find({}, function(e, results) {
      res.render('category/index', { // category/index
        pageInfo: pageInfo,
        categoryInfo: results
      });
    });
  } else { // for sub category
    var newData = {
      catName: req.body.catName,
      catParent: req.body.catParent,
      catAddDate: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    crudCat.addDataCat(newData);
    // Page render info category/index
    var pageInfo = {
      title: 'Category',
      page: "sub category added!",
      request: "post",
      sessionName: sessionName
    }
    collection.find({}, function(e, results) {
      res.render('category/index', { // category/index
        pageInfo: pageInfo,
        categoryInfo: results
      });
    });
  }
});

// Remove category
// GET to remove category/remove
router.get('/remove', function(req, res, next) {
  if (req.session.user == undefined) {
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  }

  res.redirect('/category');
});

// POST to remove user/remove Service
router.post('/remove', function(req, res) {
  if (req.session.user == undefined) {
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  }

  var removeCat = {
    _id: "Testing"
  }

  // Remove Category Parent
  if (req.body.removeCatID) {
    removeCat = {
      _id: req.body.removeCatID
    }
  } // Remove Category subCat
  if (req.body.removeCatSubID){
    var removeCat = {
      _id: req.body.removeCatSubID
    }
  } crudCat.remDataCat(removeCat);
  console.log("Cat been removed ID:" + removeCat._id);
  var pageInfo = {
    title: 'Category',
    page: "removed!",
    request: "post",
    sessionName: sessionName
  }
  collection.find({}, function(e, results) {
    res.render('category/index', { // category/index
      pageInfo: pageInfo,
      categoryInfo: results
    });
  });

});

module.exports = router;
