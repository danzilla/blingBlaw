var express = require('express');

var router = express.Router();

/* GET login page */
router.get('/', function(req, res, next) {

  if(req.session.user == undefined){

    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
    res.render('auth/index', {
      title: 'Login',
      logM: msg,
      sessionName: sessionName
     });
  } else {

    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
    res.redirect('statement');
  }
});

/* POST home page. */
router.post('/', function(req, res, next) {

  var userID = req.body.uname;
  var pwd = req.body.pwd;

  var db = req.db;
  var connDB = db.get('usercollection');

  connDB.findOne({ userName: req.body.uname }, function(err, user) {
    // In case the user not found
    if(user !== null && user.userName !== req.body.uname) { // if caught any error
      console.log('User not found')
      res.render('auth/index', {
        title: 'User not found',
        logM: 'Log In'
      });
    }
    // In case the user and pass not matched
    if(user !== null && user.userPwd == req.body.pwd) { // if caught any error
      console.log('User and Pwd are match!');
      req.session.user = user.userName; // session set for the user
      console.log("login and Session good! set - user - " + req.session.user);
      res.redirect('user');
    } else { // anything else
        console.log("Credentials wrong");
        res.render('auth/index', {
          title: 'Incorrect credentials',
          logM: 'Log In'
        });
      }
   });

});

router.get('/logout', function(req, res){
  req.session.destroy(function(e){ res.redirect('/');});
});


module.exports = router;
