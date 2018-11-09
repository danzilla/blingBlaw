/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

// config.pageInfo | config.flashData |
const config = require("../../../modules/config");

module.exports = {
  // POST
  // Remove user module
  removeUser: function(req, res, next) {
    // get session info and set pageInfo
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "post";
    console.log("\n" + config.pageInfo.title + " - " + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // if session is undefined - get - login page
    if (!req.session.user) {
      // if session empty // redirect login page
      res.redirect('/');
      console.log("\nsession incorrect - going Home\n");
    } else { // Else - session good - redirect to user
      // request DB conections
      const db = req.db;
      const collection = db.get(config.collectionBlingBlaw);
      let removeUser = {
        _id: req.body.userId
      };
      // mongo remove user
      collection.remove(removeUser, function(err, results) {
        if (err) {
          config.flashData.pageMesage = "Error removing user: " + req.body.userName;
          config.flashData.bgColor = "danger";
          config.flashData.info = err;
          req.flash('flashData', config.flashData);
          res.redirect('/user');
        }
        if (results) {
          // Uplod good, move to /user
          config.flashData.pageMesage = "User been removed: " + req.body.userName;
          config.flashData.bgColor = "warning";
          config.flashData.info = results;
          req.flash('flashData', config.flashData);
          res.redirect('/user');
        }
      });
    }
  }

}
