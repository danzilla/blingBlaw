var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.newCount){
    req.session.newCount++;
    var newCount = req.session.newCount;
    var newMsg = "Session check 1++ ";
  } else {
    req.session.newCount = 1;
    var newCount = req.session.newCount;
    var newMsg = "Session check Set to 1";
  }
  var sess = {
    newCount: newCount,
    newMsg: newMsg
  };



  res.render('index', {
    title: 'Express Hello - Login',
    sess: sess,
    logM: 'Log In'
   });
});


/* POST home page. */
router.post('/', function(req, res, next) {
  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('usercollection');

  var userID = req.body.uname;
  var pwd = req.body.pwd;

  if(req.session.newCount){
    req.session.newCount++;
    var newCount = req.session.newCount;
    var newMsg = "Session check 1++ ";
  } else {
    req.session.newCount = 1;
    var newCount = req.session.newCount;
    var newMsg = "Session check Set to 1";
  }
  var sess = {
    newCount: newCount,
    newMsg: newMsg
  };

  collection.findOne({ userName: req.body.uname }, function(err, user) {
      // In case the user not found
      if(user !== null && user.userName !== req.body.uname) { // if caught any error
        console.log('User not found')
        res.render('index', {
          title: 'User not found',
          logM: 'Log In',
          sess: sess
        });
      }
      // In case the user not found
      if(user !== null && user.userEmail == req.body.pwd) { // if caught any error
        console.log('User and Pwd are match!')
        res.redirect('view');
      } else { // anything else
          console.log("Credentials wrong");
          res.render('index', {
            title: 'Incorrect credentials',
            logM: 'Log In',
            sess: sess
          });
        }
   });

});

router.get('/logout', function(req, res){
  req.session.destroy(function(e){ res.redirect('/');});
})

module.exports = router;
