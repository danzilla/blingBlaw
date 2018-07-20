var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express Hello - Login' });
});


/* POST home page. */
router.post('/', function(req, res, next) {
  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('usercollection');

  var userID = req.body.uname;
  var pwd = req.body.pwd;


  collection.findOne({ username: req.body.uname }, function(err, user) {
      console.log('User found - user: ' + userID);
      // In case the user not found
      if(err) { // if caught any error
        console.log('Error - User not found or querry')

        res.render('index', {
          title: 'User not found'
        });
      } // if user and email are correct
      if (user && user.email === req.body.pwd) {
          console.log('User and password is correct')


          res.render('index', {
            title: 'User and password is correct'
          });
        } else { // anything else 
          console.log("Credentials wrong");

          res.render('index', {
            title: 'User and password is <b>incorrect</b>'
          });
        }
   });

   console.log("User not found: " + userID);
});

router  .post('/logout', function(req, res){
  res.clearCookie('user');
  res.clearCookie('pass');
  req.session.destroy(function(e){ res.redirect('index');});
})

module.exports = router;
