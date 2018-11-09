/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

const moment = require('moment'); // moment for Time and Date
const ObjectId = require('mongodb').ObjectID;
// pageInfo | flashData |
const config = require("../../../modules/config");

module.exports = {
  // POST
  // add category module
  addCat: function(req, res, next) {
    // get session info and set config.pageInfo
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "post";
    console.log("\n" + config.pageInfo.title + " - " + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // if session is undefined - get - login page
    if (!req.session.user) {
      // if session empty // redirect login page
      res.redirect('/');
      console.log("\nsession incorrect - going home\n");
    } else { // else - session good - redirect to category list
      // request DB conections
      const db = req.db;
      const collection = db.get(config.collectionBlingBlaw);
      // set validation Data
      let valData = {
        "_id": req.session.userId
      }
      // set create category obj
      let categoryInfo = {
        _id: ObjectId(),
        catName: req.body.catName,
        catParent: req.body.catParent,
        catModify: "",
        catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
      }
      // mongo push the new category
      collection.update(valData, {
        $push: {
          "categoryInfo": categoryInfo
        }
      }, function(err, results) {
        if (err) { // If it failed, return error
          console.log("err: " + err);
          config.flashData.pageMesage = "Error Inserting data" + categoryInfo;
          config.flashData.bgColor = "danger";
          config.flashData.info = err;
          req.flash('flashData', flashData);
          res.redirect('/category');
        } else { // else add category and redirect to Category Dashboard
          console.log("Category added: " + results);
          config.flashData.pageMesage = "Category been added: " + req.body.username;
          config.flashData.bgColor = "success";
          config.flashData.info = results;
          req.flash('flashData', config.flashData);
          res.redirect('/category');
        }
      });
    }
  }

}
