/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

// config.config.pageInfo | flashData |
const config = require("../../../modules/config");

module.exports = {
  // POST
  // postLogin module
  viewUser: function(req, res, next) {
    // get session info
    config.pageInfo.title = "Users";
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "get";
    config.pageInfo.active = "active";
    config.pageInfo.page = "Dashboard";
    console.log("\n" + config.pageInfo.title + " - " + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // if session user is empty
    if (!req.session.user) {
      // if session empty // redirect login page
      res.redirect('/');
      console.log("\nsession incorrect - going Home\n");
    } else { // else
      console.log("Active session: " + req.session.user);
      // request DB conections
      const db = req.db;
      const blingBlawCollections = db.get(config.collectionBlingBlaw);
      // get all users find()
      blingBlawCollections.find({}, {}, function(e, results) {
        res.render('user/index', {
          pageInfo: config.pageInfo,
          data: results
        });
      });
    }
  }
  // end of EXPORT
}
