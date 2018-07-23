var express = require('express');
var router = express.Router();


router.get('/in', function(req, res, next) {

  console.log("out - /in - Get");
});





router.post('/in', function(req, res, next) {
  console.log("out - /in - Post");
});

router.get('/out', function(req, res, next) {
  req.session.destroy();
  console.log("out - /out - GET");
});

router.post('/out', function(req, res, next) {
  console.log("out - /out - Post");
});

module.exports = router;
