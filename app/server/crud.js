var express = require('express');
var router = express.Router();

/* GET crud page. */
router.get('/', function(req, res, next) {

  console.log("Remove GET");
  res.redirect('view');
});

/* POST to Add User Service */
router.post('/', function(req, res) {
  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('usercollection');

  var removeUser = {
    _id: req.body.userID
  };
  collection.remove(removeUser, function(err, results) {
      if (err){
        res.send("problem removing the info ID: " + removeUser._id);
        console.log("problem removing the info ID: " + removeUser._id);
      } else {
        console.log("Information Removed from the database. ID: " + removeUser._id);
        collection.find({},{}, function(e, results){
          res.render('view', {
            title: 'Information Removed from the database',
            data: results
          });
        })
      }
   });
 });


module.exports = router;
