/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const express = require('express');
const router = express.Router();

const moment = require('moment'); // moment for Time and Date
const ObjectId = require('mongodb').ObjectID;
// config.pageInfo | config.flashData |
const config = require("../../../modules/config");

module.exports = {
  // POST
  // add category module
  updateCat: function(req, res, next) {
    // get session info and set config.pageInfo
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "post";
    console.log("\n" + config.pageInfo.title + " - " + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // if session is undefined - get - login page
    if (!req.session.user) {
      // if session empty // redirect login page
      res.redirect('/');
      console.log("\nsession incorrect - going home\n");
    } else {
      // else - session good - redirect to category list
      // request DB conections
      const db = req.db;
      const collection = db.get(config.collectionBlingBlaw);
      // set validation Data
      // mongo push the new category
      collection.update({
        _id: req.session.userId,
        "categoryInfo._id": ObjectId(req.body.updateCatId)
      }, {
        $set: {
          "categoryInfo.$.catName": req.body.updateCatName,
          "categoryInfo.$.catParent": req.body.updateCatParent,
          "categoryInfo.$.catModify": moment().format('MMMM Do YYYY, h:mm:ss a')
        }
      }, function(err, results) {
        if (err) { // if err throw err
          config.flashData.pageMesage = "Error updating data" + JSON.stringify(err);
          config.flashData.bgColor = "danger";
          config.flashData.info = err;
          req.flash('flashData', config.flashData);
          res.redirect('/category');
        }
        if (results) {
          if(results.nModified > 0){
            console.log("results: " + JSON.stringify(results));
            config.flashData.pageMesage = "Category been updated: " + req.body.updateCatName;
            config.flashData.bgColor = "success";
            config.flashData.info = results;
            req.flash('flashData', config.flashData);
            res.redirect('/category');
          } else {
            config.flashData.pageMesage = "Error updating data: " + req.body.updateCatNam;
            config.flashData.bgColor = "danger";
            config.flashData.info = err;
            req.flash('flashData', config.flashData);
            res.redirect('/category');
          }
        } else { //else
          // Uplod good, move to /category
          console.log("Category updated: ");
          config.flashData.pageMesage = "Category been updated: " + req.body.updateCatName;
          config.flashData.bgColor = "success";
          config.flashData.info = results;
          req.flash('flashData', config.flashData);
          res.redirect('/category');
        }
      });
    }
  }

}
