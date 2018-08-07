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

  collection.find({},{}, function(e, results){
    res.render('user/view', {
      title: 'User mangement',
      data: results,
      sessionName: sessionName
    });
  });
});
// POST - USER - user root page
router.post('/', function(req, res) {
  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('usercollection');

  var newData = {
    userName : req.body.username,
    userEmail : req.body.useremail,
    userDate : moment().format('MMMM Do YYYY, h:mm:ss a')
  };
  // Submit to the DB
  collection.insert(newData, function (err, results) {
    if (err) { // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else { // Hey! We Add new one!
      collection.find({ }, function(e, results){
        res.render('user/view', { // user/view
          title: 'Hey! We Add new one!',
          data: results,
          logM: 'Log Out'
        });
      });
    }
  });
});

// Remove user
// GET to remove user/remove Service
router.get('/remove', function(req, res) {
  res.redirect('/user');
 });

// POST to remove user/remove Service
router.post('/remove', function(req, res) {
  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('usercollection');

  var removeUser = {
    _id: req.body.userID
  };
  collection.remove(removeUser, function(err, results) {
      if (err){
        res.send("  problem removing the info ID: " + removeUser._id);
        console.log("problem removing the info ID: " + removeUser._id);
      } else {
        console.log("Information Removed from the database. ID: " + removeUser._id);
        collection.find({},{}, function(e, results){
          res.render('user/view', {
            title: 'Information Removed from the database',
            data: results
          });
        })
      }
   });
 });


module.exports = router;
