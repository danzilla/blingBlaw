var express = require('express');
var moment = require('moment');

var router = express.Router();

// User - root
// GET - USER - user root page
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
  var collection = db.get('usercollection');
  var pageInfo = {
    title: 'Users',
    page: "Dashboard",
    request: "get",
    sessionName: sessionName
  }
  collection.find({},{}, function(e, results){
    res.render('user/view', {
      pageInfo: pageInfo,
      data: results
    });
  });
});


// POST - USER - user root page
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

  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('usercollection');
  var newData = {
    userName : req.body.username,
    userEmail : req.body.useremail,
    userDate : moment().format('MMMM Do YYYY, h:mm:ss a')
  };
  collection.insert(newData, function (err, results) {
    if (err) { // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else { // Hey! We Add new one!
      var pageInfo = {
        title: 'Users',
        page: "added!",
        request: "post",
        sessionName: sessionName
      }
      collection.find({ }, function(e, results){
        res.render('user/view', { // user/view
          pageInfo: pageInfo,
          data: results
        });
      });
    }
  });
});

// Remove user
// GET to remove user/remove Service
router.get('/remove', function(req, res) {
  if(req.session.user == undefined){
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  }

  res.redirect('/user');
 });

// POST to remove user/remove Service
router.post('/remove', function(req, res) {
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
  var collection = db.get('usercollection');
  var removeUser = {
    _id: req.body.userID
  };
  collection.remove(removeUser, function(err, results) {
      if (err){
        res.send("Problem removing ID: " + removeUser._id);
        console.log("Problem removing ID: " + removeUser._id);
      } else {
        console.log("Info been Removed! ID: " + removeUser._id);


        var pageInfo = {
          title: 'Users',
          page: "removed!",
          request: "post",
          sessionName: sessionName
        }
        collection.find({},{}, function(e, results){
          res.render('user/view', {
            pageInfo: pageInfo,
            data: results
          });
        })
      }
   });
 });


module.exports = router;
