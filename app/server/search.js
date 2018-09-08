var express = require('express');
var moment = require('moment');

var router = express.Router();

// Search - root
// GET - SEARCH - SEARCH root page
router.get('/', function(req, res, next) {
  if(req.session.user == undefined){
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
  var pageInfo = {
    title: 'SEARCHs',
    page: "Dashboard",
    request: "get",
    sessionName: sessionName
  }
  collection.find({},{}, function(e, results){
    res.render('search/index', {
      pageInfo: pageInfo,
      categoryInfo: results,
      data: results
    });
  });
});


// POST - SEARCH - SEARCH root page
router.post('/', function(req, res) {
  if(req.session.user == undefined){
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
  var searchQ = req.body.search;

  collection.find({$text: {$search: searchQ}}, function (err, results) {
    if (err) {
        res.send("There was a issue with find \n err: " + err);
        console.log(err);
    } else {

      var pageInfo = {
        title: 'SEARCHs',
        page: "Query!",
        request: "post",
        sessionName: sessionName
      }
      res.render('search/index', { //  search/index
        pageInfo: pageInfo,
        categoryInfo: results,
        data: results

      });
      console.log("search Query: " + JSON.stringify(searchQ));
      console.log("search results: " + JSON.stringify(results));
    }
  });

});


module.exports = router;
