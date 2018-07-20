var express = require('express');
var router = express.Router();



/* GET hello page. */
router.get('/', function(req, res, next) {
  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('usercollection');

  collection.find({},{}, function(e, results){
    res.render('view', {
      title: 'Hey! We made it',
      data: results
    });
  });
});


/* POST to Add User Service */
router.post('/', function(req, res) {
  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('usercollection');

    // Get our form values. These rely on the "name" attributes
    var dataInsert = {
      userName : req.body.username,
      userEmail : req.body.useremail
    }
    var searchA = "";

    // Submit to the DB
    collection.insert({ dataInsert }, function (err, results) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
        collection.find({ }, function(e, results){
          res.render('view', {
            title: 'Hey! We Add new one!',
            data: results
          });
        });
      }
    });
});




module.exports = router;
