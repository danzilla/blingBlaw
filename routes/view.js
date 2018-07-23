var express = require('express');
var moment = require('moment');

var router = express.Router();


/* GET hello page. */
router.get('/', function(req, res, next) {
  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('usercollection');

  collection.find({},{}, function(e, results){
    res.render('view', {
      title: 'Hey! We made it',
      data: results,
      logM: 'Log Out'
    });
  });
});

/* POST to Add User Service */
router.post('/', function(req, res) {
  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('usercollection');

  var newData = {
    userName : req.body.username,
    userEmail : req.body.useremail,
    userDate : moment().format('MMMM Do YYYY, h:mm:ss a')
  };
  // Get our form values. These rely on the "name" attributes
  // Submit to the DB
  collection.insert(newData, function (err, results) {
    if (err) { // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else { // Hey! We Add new one!
      collection.find({ }, function(e, results){
        res.render('view', {
          title: 'Hey! We Add new one!',
          data: results,
          logM: 'Log Out'
        });
      });
    }
  });
});



module.exports = router;
