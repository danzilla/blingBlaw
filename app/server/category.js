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
    // categorycollection
    //  _id
    //  catName
    //  // _id = _id
    //  // catName
    //  // catAddDate
    //  catAddDate
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


// POST - category - Category root page
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
  if (req.body.catParent == "root") {
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
      };
    });
  } else { // anything else - update
    // UPDATE
    var newData = {
      catName: req.body.catName,
      catAddDate: moment().format('MMMM Do YYYY, h:mm:ss a')
    };
    var updateCondition = {
      _id: req.body.catParent
    };

    console.log("updateCondition: " + JSON.stringify(updateCondition));

    collection.update({_id: req.body.catParent}, {$push: {subCat: newData}}, {}, function(err, results) {
      if (err) { // If it failed, return error
        console.log(err);
        res.send("There was a problem updating: " + req.body.catParent);
      } else { // Hey! We Add new one!
        console.log(results);

        var pageInfo = {
          title: 'Category',
          page: "updated!",
          request: "post",
          sessionName: sessionName
        }
        collection.find({}, function(e, results) {
          console.log("cat been update for: " + req.body.catParent);
          res.render('category/view', { // category/view
            pageInfo: pageInfo,
            categoryInfo: results
          });
        });
      };
    });
  };
});

// Remove user
// GET to remove user/remove Service
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
  };

  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('categorycollection');
  var removeCat = {
    _id: req.body.catID
  };
  collection.remove(removeCat, function(err, results) {
    if (err) {
      res.send("Problem removing ID: " + removeCat._id);
      console.log("Problem removing ID: " + removeCat._id);
    } else {
      console.log("Info been Removed! ID: " + removeCat._id);

      var pageInfo = {
        title: 'Category',
        page: "removed!",
        request: "post",
        sessionName: sessionName
      }
      collection.find({}, {}, function(e, results) {

        res.render('category/view', {
          pageInfo: pageInfo,
          categoryInfo: results
        });
      })
    };
  });
});



module.exports = router;
