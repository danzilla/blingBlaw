var express = require('express');
var moment = require('moment');

var router = express.Router();

// Category - root
// GET - category - Category root page
router.get('/', function(req, res, next) {
  if(req.session.user == undefined){
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  }

  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('categorycollection');
  var pageInfo = {
    title: 'Category',
    page: "Dashboard",
    request: "get",
    sessionName: sessionName
  }
  collection.find({},{}, function(e, results){
    res.render('category/view', {
      pageInfo: pageInfo,
      categoryInfo: results
    });
  });
});


// POST - category - Category root page
router.post('/', function(req, res) {
  if(req.session.user == undefined){
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  }

  if(req.body.catParent){
    var catParent = req.body.catParent;
  } else {
    var catParent = "root";
  }
  var newData = {
    catName : req.body.catName,
    catParent : catParent,
    catAddDate : moment().format('MMMM Do YYYY, h:mm:ss a')
  };
  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('categorycollection');
  collection.insert(newData, function (err, results) {
    if (err) { // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else { // Hey! We Add new one!
      var pageInfo = {
        title: 'Category',
        page: "added!",
        request: "post",
        sessionName: sessionName
      }
      collection.find({}, function(e, results){
        res.render('category/view', { // category/view
          pageInfo: pageInfo,
          categoryInfo: results
        });
      });
    }
  });
});


module.exports = router;
