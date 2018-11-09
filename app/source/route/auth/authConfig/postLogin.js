/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

// pageInfo | flashData |
const config = require("../../../modules/config");

module.exports = {
  // POST
  // postLogin module
  postLogin: function(req, res, next) {
    // set pageInfo
    config.pageInfo.page = "Auth page";
    config.pageInfo.request = "post";

    console.log("\n" + config.pageInfo.title + " - " + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // request DB conections
    const db = req.db;
    const connDB = db.get(config.collectionBlingBlaw); //collection - user
    connDB.findOne({
      "userInfo.userName": req.body.uname
    }, function(err, user) {
      // if user not empty and pwd match // Credentials are matched
      if (user !== null && user.userInfo.userPwd == req.body.pwd) {
        //set session for the user and redirect to /user page
        req.session.user = req.body.uname;
        req.session.userId = user.userInfo.userId;
        // set flash message
        config.flashData.pageMesage = "Logged in! " + req.session.user;
        config.flashData.bgColor = "success";
        req.flash('flashData', config.flashData);
        res.redirect('/user');
      } else { // else
        // anything else  - render login page with messages
        //set session for the user and redirect to /user page
        console.log(config.flashData.pageMesage);
        config.flashData.pageMesage = "incorrect credentials";
        req.flash('flashData', config.flashData);
        res.redirect('/');
      }
    });
  }

}
