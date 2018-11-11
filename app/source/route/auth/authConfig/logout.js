/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

// Global Config
const config = require("../../../modules/config");

// Logout page
// redirect to / home login page

module.exports = {

  logOutAll: function(req, res) {
    // get session info and set config.pageInfo
    config.pageInfo.title = "Bling blaw ~ Budget";
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "POST";
    config.pageInfo.active = "active";
    config.pageInfo.page = "Logout";
    console.log(config.pageInfo.title + " - " + config.pageInfo.page + "(" + config.pageInfo.request + ")");

    req.session.destroy(function(e, f) {
      if (e) {
        console.log("error log out: " + e)
      }
      // logout Bye~
      //set session for the user and redirect to /user page
      console.log("\n Bye ~ logged off ~ \n");
      res.redirect('/');
    });
  }

}
