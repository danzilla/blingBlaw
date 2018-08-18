var express = require('express');
var moment = require('moment');

var router = express.Router();

// Category - root
// GET - category - Category root page
router.get('/', function(req, res, next) {
  if (req.session.user == undefined) {
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  };

  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('categorycollection');
  collection.find({}, {}, function(e, results) {
    var pageInfo = {
      title: 'Category',
      page: "Dashboard",
      request: "get",
      sessionName: sessionName
    }
    res.render('category/view', {
      pageInfo: pageInfo,
      categoryInfo: results
    });
  });
});


// POST - category - Insert new Category
router.post('/', function(req, res) {

  if (req.session.user == undefined) {
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  }

  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('categorycollection');
    // categorycollection
    //  _id
    //  catName
    //  // _id = _id
    //  // catName
    //  // catAddDate
    //  catAddDate

  // Add category
  // Add Parent category - if its select=root
  if (req.body.catParentName == "root") {
    // root - New cat
    var newData = {
      catName: req.body.catName,
      catAddDate: moment().format('MMMM Do YYYY, h:mm:ss a')
    };
    collection.insert(newData, function(err, results) {
      if (err) { // If it failed, return error
        res.send("There was a problem adding the information to the database.");
      } else { // Hey! We Add new one!
        var pageInfo = {
          title: 'Category',
          page: "added!",
          request: "post",
          sessionName: sessionName
        }
        collection.find({}, function(e, results) {
          console.log("New cat been added! :" + newData.catName);
          res.render('category/view', { // category/view
            pageInfo: pageInfo,
            categoryInfo: results
          });
        });
      }
    });
  } else { // Else add Sub category
    // Add sub category - if its select=<category>
    // UPDATE - insert into selected category
    var newData = {
      subCat: {
        catName: req.body.catName,
        catAddDate: moment().format('MMMM Do YYYY, h:mm:ss a')
      }
    }
    var updateCondition = {
      _id: req.body.catParentName
    }
    console.log("updateCondition: " + JSON.stringify(updateCondition));
    collection.update(updateCondition, {$push: newData}, {},
      function(err, results) {
      if (err) { // If it failed, return error
        console.log(err);
        res.send("There was a problem updating: " + req.body.catParent);
      } else { // Hey! We Add new one!
        console.log(results);
        var pageInfo = {
          title: 'Category',
          page: "sub category added!",
          request: "post",
          sessionName: sessionName
        }
        collection.find({}, function(e, results) {
          res.render('category/view', { // category/view
            pageInfo: pageInfo,
            categoryInfo: results
          });
        });
      }
    });
  }
});

// Remove category
// GET to remove category/remove
router.get('/remove', function(req, res) {
  if (req.session.user == undefined) {
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  }

  res.redirect('/category');
});

// POST to remove user/remove Service
router.post('/remove', function(req, res) {
  if (req.session.user == undefined) {
    var msg = "Session is empty";
    sessionName = "Session is Empty";
    console.log(msg);
  } else {
    var msg = "Session is active, user: " + req.session.user;
    sessionName = req.session.user;
    console.log(msg);
  }

  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('categorycollection');

  if (req.body.removeCatSubName){
    // Remove sub category by $pull
    var pullData = {
      catName: req.body.removeCatSubName,
      catAddDate: req.body.removeCatSubDate
    }
    collection.update({_id: req.body.removeCatParentID},
      {$pull: {"subCat": pullData}},
       function (err, results) {
         if (err) { // If it failed, return error
           console.log(err);
           res.send("There was a problem removing: " + req.body.removeCatSubName);
         } else { // Hey! We Add new one!
           console.log(results);

           var pageInfo = {
             title: 'Category',
             page: "sub category removed",
             request: "post",
             sessionName: sessionName
           }
           collection.find({}, function(e, results) {
             console.log("sub cat been removed: " + req.body.removeCatParentID);
             res.render('category/view', { // category/view
               pageInfo: pageInfo,
               categoryInfo: results
             });
           });
         };
       });
   } if (req.body.removeCatID){

    // Remove Category Parent
    var removeCat = {
      _id: req.body.removeCatID
    }
    collection.remove(removeCat, function(err, results) {
      if (err) {
        res.send("Problem removing ID: " + removeCat._id);
        console.log("Problem removing ID: " + removeCat._id);
      } else {
        console.log("\nCat Removed! ID: " + removeCat._id);
        var pageInfo = {
          title: 'Category',
          page: "Category removed!",
          request: "post",
          sessionName: sessionName
        }
        collection.find({}, {}, function(e, results) {
          res.render('category/view', {
            pageInfo: pageInfo,
            categoryInfo: results
          });
        });
      }
    });
  }
});



module.exports = router;
