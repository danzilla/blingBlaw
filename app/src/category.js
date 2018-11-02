/* No Var - let and const
 * try ES6 + async
 * NodeJS + Monk + Session = keep it simple
 */
const express = require('express');
const router = express.Router();
const moment = require('moment'); // moment for Time and Date

// get - /category
// post - curd
// all - /

//randomColor
function randomColor() {
    return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
}

// Category good! CRUD works - Add, Update, Remove - Good
// grpah - pie Chart for GET - /category - chartInfo
//

// DB collection = Category collection
const collectionName = "categorycollection";
// pageInfo detailes
let pageInfo = {
  title: 'Category',
  page: "Dashboard",
  request: "",
  sessionName: "",
  active: ""
}
let flashData = {
  page: pageInfo.page,
  pageMesage: "",
  info: "",
  bgColor: ""
}


// Category - Dashboard
// GET - category page
router.get('/', function(req, res, next) {
  // get session info
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "get";
  pageInfo.active = "active";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");
  // if session user is empty
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
  } else { //else
    console.log("Active session: " + req.session.user);
    // request DB conections
    const db = req.db;
    const collection = db.get(collectionName);
    // get all users find()
    collection.find({}, {}, function(e, resultsCat) {
      // prepare chart info
      const chartInfo = {
        chartName: "Category and subcategory - diversify",
        chartData: {
          dataLabel: [],
          dataValue: [],
          dataColor: []
        }
      }
      // category chartInfo
      // get Cat in two Arrays
      // go through all category list
      for (let i = 0; i < resultsCat.length; i++) {
        // if root - parent category
        if (resultsCat[i].catParent == "root") {
          // push to dataLabel array - catParent
          chartInfo.chartData.dataLabel.push(resultsCat[i].catName);
          chartInfo.chartData.dataColor.push(randomColor());
          let subCatTotal = 0; //set total-subCat
          for (let j = 0; j < resultsCat.length; j++) {
            // subcategory list = parentID
            if (resultsCat[i]._id == resultsCat[j].catParent) {
              // count sub category
              subCatTotal++;
            }
          }
          // push to dataValue - count child array
          chartInfo.chartData.dataValue.push(subCatTotal);
        }
      }
      res.render('category/index', {
        pageInfo: pageInfo,
        data: resultsCat,
        chartInfo: chartInfo
      });
    });
  }
});







//
// POST
// CRUD - Add Update Remove - Category
//

// Add category
// post to add category/add
router.post('/add', function(req, res, next) {
  // get session info and set pageInfo
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "post";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");
  // if session is undefined - get - login page
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going home\n");
  } else { // else - session good - redirect to category list
    // request DB conections
    const db = req.db;
    const collection = db.get(collectionName);
    // set newData to insert
    let newData = { // set New data for parent Category
      catName: req.body.catName,
      catParent: req.body.catParent,
      catAddDate: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    // insert newData
    collection.insert(newData, function(err, results) {
      if (err) { // If it failed, return error
        flashData.pageMesage = "Error Inserting data" + newData;
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/category');
      } else { // else add category and redirect to Category Dashboard
        console.log("Category added: " + results);
        flashData.pageMesage = "Category been added: " + req.body.username;
        flashData.bgColor = "success";
        flashData.info = results;
        req.flash('flashData', flashData);
        res.redirect('/category');
      }
    });
  }
});

// Update category
// post to update category/Update
router.post('/update', function(req, res, next) {
  // get session info and set pageInfo
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "post";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");

  // if session is undefined - get - login page
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
  } else { // else - session good - redirect to user
    // request DB conections
    const db = req.db;
    const collection = db.get(collectionName);
    // set validation Data
    let valData = {
      _id: req.body.updateCatId
    }
    let newData = { // set new data for updae
      catName: req.body.updateCatName,
      catParent: req.body.updateCatParent,
      catAddDate: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    collection.update(valData, {
      $set: newData
    }, function(err, results) {
      if (err) { // if err throw err
        flashData.pageMesage = "Error updating data" + newData;
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/category');
      } else { //else
        // Uplod good, move to /category
        console.log("Category updated: " + results);
        flashData.pageMesage = "Category been updated: " + req.body.updateCatName;
        flashData.bgColor = "success";
        flashData.info = results;
        req.flash('flashData', flashData);
        res.redirect('/category');
      }
    });
  }
});

// Remove Category
// POST to remove category/remove
router.post('/remove', function(req, res, next) {
  // get session info and set pageInfo
  pageInfo.sessionName = req.session.user;
  pageInfo.request = "post";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");

  // if session is undefined - get - login page
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
  } else { // else - session good - redirect to user
    // request DB conections
    const db = req.db;
    const collection = db.get(collectionName);
    let removeData = {
      _id: req.body.removeCat
    };
    collection.remove(removeData, function(err, results) {
      if (err) {
        flashData.pageMesage = "Error removing data" + newData;
        flashData.bgColor = "danger";
        flashData.info = err;
        req.flash('flashData', flashData);
        res.redirect('/category');
      } else {
        console.log("Category been Removed: " + results);
        flashData.pageMesage = "Category been Removed: " + req.body.removeCat;
        flashData.bgColor = "warning";
        flashData.info = results;
        req.flash('flashData', flashData);
        res.redirect('/category');
      }
    });
  }
});





// ALL ROUTE
// ALL add category page
router.all('/add', function(req, res, next) {
  // if session is undefined - get - login page
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
  } else { // else - session good - redirect to user
    // Session active - redirect to /category page
    res.redirect('/category');
    console.log("Active session: " + req.session.user);
  }
});
// ALL update category page
router.all('/update', function(req, res, next) {
  // if session is undefined - get - login page
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
  } else { // else - session good - redirect to user
    // Session active - redirect to /category page
    res.redirect('/category');
    console.log("Active session: " + req.session.user);
  }
});
// ALL remove page
router.all('/remove', function(req, res, next) {
  // if session is undefined - get - login page
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
  } else { // else - session good - redirect to user
    // Session active - redirect to /category page
    res.redirect('/category');
    console.log("Active session: " + req.session.user);
  }
});


module.exports = router;
