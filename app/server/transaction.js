var express = require('express');
var csvjson = require("csvtojson");
var fs = require('fs');

var router = express.Router();

/* GET login page */
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

  var options = {
    delimiter : ',' , // optional
    quote     : '"' // optional
  };
  var file_data = fs.readFileSync('air.csv', { encoding : 'utf8'});
  console.log(file_data);

  csvjson({
      noheader:true,
      output: "csv"
  })
  .fromString(file_data)
  .then((csvRow)=>{
      console.log(csvRow) // => [["1","2","3"], ["4","5","6"], ["7","8","9"]]
  })

  var transactionInfo = "asd";

  res.render('transaction/view', {
    title: 'transaction GET Home',
    logM: msg,
    sessionName: sessionName,
    transactionInfo: transactionInfo
   });
});

/* POST home page. */
router.post('/', function(req, res, next) {
    if(req.session.user == undefined){
      var msg = "Session is empty";
      sessionName = "Session is Empty";
      console.log(msg);
    } else {
      var msg = "Session is active, user: " + req.session.user;
      sessionName = req.session.user;
      console.log(msg);
    }

  var transactionInfo = {
    id: req.body.id,
    date: req.body.Date,
    Desc: req.body.Desc,
    Withdraw: req.body.Withdraw,
    Deposite: req.body.Deposite,
    Balance: req.body.Balance,
    Category: req.body.Category,
  }
  console.log("transaction: " + transactionInfo);

  res.render('transaction/view', {
    title: 'transaction POST Home',
    logM: msg,
    sessionName: sessionName,
    transactionInfo: transactionInfo
   });
});


module.exports = router;
