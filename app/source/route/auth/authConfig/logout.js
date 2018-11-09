/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

// Logout page
// redirect to / home login page

module.exports = {

  logOutAll: function(req, res) {
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
