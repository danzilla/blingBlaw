/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = kep it minimal
*/
var express = require('express');
var router = express.Router();

/* GET login page */
router.get('/', function(req, res, next) {``
  // if session is undefined - get - login page
  if (!req.session.user) {
    // pageInfo detailes
    let pageInfo = {
      title: "Login",
      page: "Auth-page",
      request: "get",
      sessionName: req.session.user,
      logM: 'Login'
    }
    // render - login page
    res.render('auth/index', {pageInfo});
    } else { // else - session good - redirect to user
      console.log("Active session: " + req.session.user);
      // Session active - redirect to /user page
      res.redirect('/user');
    }
});

/* POST login page. */
router.post('/', function(req, res, next) {
  // pageInfo detailes
  let pageInfo = {
    title: "Login",
    page: "Auth-page",
    request: "post",
    sessionName: req.session.user,
    logM: 'Login'
  }

  const db = req.db;
  const connDB = db.get('usercollection');
  connDB.findOne ({ userName: req.body.uname }, function(err, user) {
    // if user not empty and pwd match // Credentials are matched
    if (user !== null && user.userPwd == req.body.pwd) { // if caught any error
      //set session for the user and redirect to /user page
      req.session.user = user.userName;
      res.redirect('user');
    } else {
        // anything else // render login page with messages
        pageInfo.logM = "Login <small>try again</small>";
        console.log("Credentials wrong");
        res.render('auth/index', {pageInfo});
      }
  });
});

// ALL logout page
// redirect to / home login page
router.all('/logout', function(req, res){
  req.session.destroy( function(e) {
    res.redirect('/');
  });
});


module.exports = router;
