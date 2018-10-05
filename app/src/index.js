/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
*/
const express = require('express');
const router = express.Router();

// auth module
const crudAuth = require('./modules/auth');
crudAuth.hi();

// Home page
/* GET login page */
router.get('/', function(req, res, next) {
  console.log("\n ~ Hi ~ \n");

  // pageInfo detailes
  let pageInfo = {
    title: "Login",
    page: "Auth-page",
    request: "get",
    sessionName: "nada",
    logM: 'Login'
  }
  // if session is undefined - get - login page
  if (!req.session.user) {
    // render - login page
    res.render('auth/index', {pageInfo});
    } else { // else - session good - redirect to user
      // Session active - redirect to /user page
      res.redirect('/user');
      console.log("Active session: " + req.session.user);
    }
});

// Auth
// POST login page.
router.post('/', function(req, res, next) {
  // pageInfo detailes
  let pageInfo = {
    title: "Login",
    page: "Auth-page",
    request: "post",
    sessionName: req.session.user, //get stored session
    logM: 'Login'
  }
  // request DB conections
  const db = req.db;
  const connDB = db.get('usercollection'); //collection - user
  connDB.findOne ({ userName: req.body.uname }, function(err, user) {
    // if user not empty and pwd match // Credentials are matched
    if (user !== null && user.userPwd == req.body.pwd) {
      //set session for the user and redirect to /user page
      req.session.user = user.userName;
      res.redirect('user');
    } else { // else
        // anything else // render login page with messages
        pageInfo.logM = "Login <small>try again</small>";
        console.log("Credentials wrong");
        res.render('auth/index', {pageInfo});
      }
  });
});

// Logout page
// redirect to / home login page
router.all('/logout', function(req, res){
  req.session.destroy( function(e, f) {
    if(e) {console.log("error log out: " + e)};
    // logout Bye~
    console.log("\n Bye~ \n");
    res.redirect('/');
  });
});


module.exports = router;