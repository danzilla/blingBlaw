var express = require('express');
var router = express.Router();

/* GET hello page. */
router.get('/', function(req, res, next) {

  console.log("Remove GET");
  res.redirect('view');
});


/* POST to Add User Service */
router.post('/', function(req, res) {

    var userID = req.body.userID;
    // Set our internal DB variable
    var db = req.db;
    var collection = db.get('usercollection');

    collection.remove({_id: userID}, function(err, results) {
          if (err){
            res.send("There was a problem removing the information to the database. ID: " + userID);
            console.log("There was a problem removing the information to the database. ID: " + userID);
          }
          else {
            console.log("Information Removed from the database. ID: " + userID);
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
