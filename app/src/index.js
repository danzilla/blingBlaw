/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
*/
const express = require('express');
const router = express.Router();

// auth module
const crudAuth = require('./modules/auth');
console.log(crudAuth.hi());
const crudUser = require('./modules/crudUser');
console.log(crudUser.hi()); // test hi
const sessionLOL = require('./modules/session');
console.log(sessionLOL.hi());


// DB collection = Category collection
const collectionName = "categorycollection";
// pageInfo detailes
let pageInfo = {
  title: 'Login',
  page: "",
  request: "",
  sessionName: "",
  pageOption: ""
}
let flashData = {
  page: pageInfo.page,
  pageMesage: "",
  info: "",
  bgColor: ""
}


// Home page
/* GET login page */
router.get('/', function(req, res, next) {
  console.log("\n ~ Hi ~");
  // set pageInfo
  pageInfo.page = "Auth page";
  pageInfo.request = "get";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");
  // if session is undefined - get - login page
  if (!req.session.user) {
    // render - login page
    pageInfo.pageOption = "login";
    res.render('auth/index', {pageInfo: pageInfo});
  } else { // else - session good - redirect to user
    // Session active - redirect to /user page
    flashData.pageMesage = "Auto login! " + req.session.user;
    flashData.bgColor = "success";
    req.flash('flashData', flashData);
    res.redirect('/user');
    console.log("Auto login - Active session: " + req.session.user);
  }
});

// Auth
// POST login page.
router.post('/', function(req, res, next) {
  // set pageInfo
  pageInfo.page = "Auth page";
  pageInfo.request = "post";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");
  // request DB conections
  const db = req.db;
  const connDB = db.get('fanny'); //collection - user
  connDB.findOne ({ "userInfo.userName": req.body.uname }, function(err, user) {
    // if user not empty and pwd match // Credentials are matched
    if (user !== null && user.userInfo.userPwd == req.body.pwd) {
      //set session for the user and redirect to /user page
      req.session.user = req.body.uname;
      // set flash message
      flashData.pageMesage = "Logged in goood! " + req.session.user;
      flashData.bgColor = "success";
      req.flash('flashData', flashData);
      res.redirect('/user');
      } else { // else
        // anything else  - render login page with messages
        //set session for the user and redirect to /user page
        flashData.pageMesage = "incorrect credentials";
        req.flash('flashData', flashData);
        console.log(flashData.pageMesage);
        res.render('auth/index', { pageInfo:pageInfo });
      }
  });
});

// Logout page
// redirect to / home login page
router.all('/logout', function(req, res){
  req.session.destroy( function(e, f) {
    if(e) {console.log("error log out: " + e)}
    // logout Bye~
    //set session for the user and redirect to /user page
    res.redirect('/');
    console.log("\n Bye ~ logged off ~ \n");
  });
});


module.exports = router;
