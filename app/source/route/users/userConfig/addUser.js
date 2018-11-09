/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

const moment = require('moment'); // moment for Time and Date
const ObjectId = require('mongodb').ObjectID;
// config.config.config.pageInfo | flashData |
const config = require("../../../modules/config");
const sampleData = require("../../../modules/sampleData");

module.exports = {
  // GET
  // GET user
  addUserGET: function(req, res, next) {
    // get session info
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "get";
    config.pageInfo.active = "active";
    config.pageInfo.page = "register";
    console.log("\n" + config.pageInfo.title + " - " + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    console.log("Active session: " + req.session.user);
    res.render('auth/index', {
      pageInfo: config.pageInfo
    });
  },
  // end of addUserGET

  // POST
  // postLogin module
  addUserPOST: function(req, res, next) {
    // get session info and set pageInfo
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "post";
    console.log("\n" + config.pageInfo.title + " - " + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // if session is undefined - get - login page
    if (!req.body.username || !req.body.pwd) {
      // if session empty // redirect login page
      res.redirect('/');
      console.log("\nsession incorrect - going home\n");
    } else { // else - session good - redirect to user
      // request DB conections
      const db = req.db;
      const blingBlawCollections = db.get(config.collectionBlingBlaw);
      // blingBlaw - collection user with temp category Data
      let user_id = ObjectId();
      let blingBlawUserCreate = {
        _id: user_id,
        userInfo: {
          userId: user_id,
          userFannyPack: req.body.fannyPack,
          userName: req.body.username,
          userPwd: req.body.pwd,
          userEmil: "",
          userGrup: "",
          userModify: "",
          userCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
        },
        transactionInfo: [],
        statementInfo: [],
        categoryInfo: sampleData.categories
      }
      // create blingBlaw - user
      blingBlawCollections.insert(blingBlawUserCreate, function(err, results) {
        if (err) { // If it failed, return error
          config.flashData.pageMesage = "Error Inserting data" + newData;
          config.flashData.bgColor = "danger";
          config.flashData.info = err;
          req.flash('flashData', flashData);
          res.redirect('/user');
        } else { // else add user and redirect to User Dashboard
          console.log("User added: " + results);
          config.flashData.pageMesage = "User been created! " + req.body.username;
          config.flashData.bgColor = "success";
          config.flashData.info = results;
          req.flash('flashData', config.flashData);
          res.redirect('/user');
        }
      });
    }
  }

}
