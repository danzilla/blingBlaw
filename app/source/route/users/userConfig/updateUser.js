/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

const moment = require('moment'); // moment for Time and Date
const ObjectId = require('mongodb').ObjectID;
// config.config.pageInfo | flashData |
const config = require("../../../modules/config");

module.exports = {
  // POST
  // postLogin module
  updateUser: function(req, res, next) {
    // get session info and set pageInfo
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "post";
    console.log("\n" + config.pageInfo.title + " - " + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // if session is undefined - get - login page
    if (!req.session.user) {
      // if session empty // redirect login page
      res.redirect('/');
      console.log("\nsession incorrect - going Home\n");
    } else { // else - session good - redirect to user
      // request DB conections
      const db = req.db;
      const collection = db.get(config.collectionBlingBlaw);
      // set validation Data
      let valData = {
        _id: req.body.userId
      }
      // set update user obj
      let blingBlawUpdateUser = {
        "userInfo.userFannyPack": req.body.fannyPack,
        "userInfo.userName": req.body.userName,
        "userInfo.userPwd": req.body.userPwd,
        "userInfo.userEmil": req.body.userEmil,
        "userInfo.userGrup": req.body.userGrup,
        "userInfo.userModify": moment().format('MMMM Do YYYY, h:mm:ss a')
      }
      // mongo update the User
      collection.update(valData, {
        $set: blingBlawUpdateUser
      }, function(err, results) {
        if (err) { // if err throw err
          config.flashData.pageMesage = "Error updating user: " + req.body.userName;
          config.flashData.bgColor = "danger";
          config.flashData.info = err;
          req.flash('flashData', config.flashData);
          res.redirect('/user');
        } else { //else
          // upload good, move to /user
          config.flashData.pageMesage = "User been updated: " + req.body.userName;
          config.flashData.bgColor = "success";
          config.flashData.info = results;
          req.flash('flashData', config.flashData);
          res.redirect('/user');
        }
      });
    }
  }
  // end of EXPORT
}
