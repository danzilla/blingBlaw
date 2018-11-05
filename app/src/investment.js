/* No Var - let and const
 * try ES6 + async
 * NodeJS + Monk + Session = keep it simple
 */
const express = require('express');
const router = express.Router();
const moment = require('moment'); // moment for Time and Date
const csvjson = require('csvjson'); //csv to json
const fs = require('fs'); // fs filesystem
// randomColor
const randomColor = require('random-color');
// ObjectID - require
const ObjectId = require('mongodb').ObjectID;

const multer = require('multer'); //mlter for file upload
const uploadFolder = multer({
  dest: 'app/uploads/'
}); // upload location app/uploads/

// get - /statement
// post - curd
// all - /

// DB collectionSta = Statement collectionSta
const staCollectionName = "statementCollection";
const catCollectionName = "categorycollection";
// pageInfo detailes
let pageInfo = {
  title: 'Investment',
  page: "",
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

// investment - Dashboard
// GET - investment page
router.get('/', function(req, res, next) {
  pageInfo.request = "get";
  pageInfo.page = "Dashboard";
  pageInfo.active = "active";
  console.log("\n" + pageInfo.title + " - " + pageInfo.page + "(" + pageInfo.request + ")");
  // if session user is empty
  if (!req.session.user) {
    // if session empty // redirect login page
    res.redirect('/');
    console.log("\nsession incorrect - going Home\n");
  } else { //else
    // get session info
    pageInfo.sessionName = req.session.user;
    console.log("Active session: " + pageInfo.sessionName);
    // request DB conections
    const db = req.db;
    const collectionSta = db.get(staCollectionName);
    const collectionCat = db.get(catCollectionName);
    // get all categorycollection find()
    collectionCat.find({}, {}, function(eCat, resultsCat) {
      // get all statementCollection find()
      collectionSta.find({}, {}, function(eSta, resultsSta) {


        // prepare chart info
        const chartInfoParent = {
          chartName: 'Expenses',
          chartData: {
            dataLabel: [],
            dataValue: [],
            dataColor: [],
            dataParentId: []
          }
        }
        // prepare chart info
        const chartInfoChild = {
          chartName: "overview: <child>",
          charts:[]
        }
        // prepare chart info
        const budgetSummary = {
          chartName: "overview: <budgetSummary>",
          chartData: {
            dataLabel: [],
            dataValue: [],
            dataColor: [],
            dataParentId: []
          }
        }

        // category
        // get Cat in two Arrays
        // for ease of use... - need better way
        const catParentArray = [];
        const catChildArray = [];
        for (cat in resultsCat) {
          // Parent Category
          if (resultsCat[cat].catParent == "root") {
            let pushD = {
              _id: resultsCat[cat]._id,
              catName: resultsCat[cat].catName,
              catParent: resultsCat[cat].catParent,
              catAddDate: resultsCat[cat].catAddDate
            }
            catParentArray.push(pushD);
          }
          // Child Category
          if (resultsCat[cat].catParent !== "root") {
            let pushD = {
              _id: resultsCat[cat]._id,
              catName: resultsCat[cat].catName,
              catParent: resultsCat[cat].catParent,
              catAddDate: resultsCat[cat].catAddDate
            }
            catChildArray.push(pushD);
          }
        }
        // transaction
        // ready transaction to find catParentName from catParentID - catParentArray
        const transInfo = [];
        for (sta in resultsSta) {
          for (let tra = 0; tra < resultsSta[sta].transactionInfo.length; tra++) {
            // set up pushD for transInfo
            let pushD = {
              transId: resultsSta[sta].transactionInfo[tra].transId,
              transDate: resultsSta[sta].transactionInfo[tra].transDate,
              transType: resultsSta[sta].transactionInfo[tra].transType,
              transaction: "",
              transCat: "",
              catParent: "",
              transCatId: "",
              catParentId: ""
            }
            // if the category is NOT empty or nada - add catname and transaction
            if (resultsSta[sta].transactionInfo[tra].transCat !== "nada" ||
              resultsSta[sta].transactionInfo[tra].transCat !== "") {
              if (resultsSta[sta].transactionInfo[tra].transDeposite) {
                // if deposite and NOT nada - add transCat
                pushD.transaction = resultsSta[sta].transactionInfo[tra].transDeposite;
              }
              if (resultsSta[sta].transactionInfo[tra].transWithdraw) {
                // if withdraw and NOT nada
                pushD.transaction = resultsSta[sta].transactionInfo[tra].transWithdraw;
              }
              // category names for parent and child category
              for (catC in catChildArray) {
                // transCat = to catArry id
                if (resultsSta[sta].transactionInfo[tra].transCat == catChildArray[catC]._id) {
                  // push CatID to transInfo - Child
                  pushD.transCat = catChildArray[catC].catName;
                  pushD.transCatId = resultsSta[sta].transactionInfo[tra].transCat;
                  // push CatID to transInfo - Parent
                  for (catP in catParentArray) { // if the catP_id == catC-parent
                    if (catParentArray[catP]._id == catChildArray[catC].catParent) {
                      pushD.catParent = catParentArray[catP].catName;
                      pushD.catParentId = catParentArray[catP]._id;
                    }
                  }
                }
              }
            }
            // empty category
            // if the category is empty or undefined or nada - add nada and transaction
            if (resultsSta[sta].transactionInfo[tra].transCat == "nada" ||
              resultsSta[sta].transactionInfo[tra].transCat == "" ||
              resultsSta[sta].transactionInfo[tra].transCat == "undefined") {
              if (resultsSta[sta].transactionInfo[tra].transDeposite) {
                //if deposite and NOT nada - add transCat
                pushD.transCat = "nada"
                pushD.catParent = "nada"
                pushD.catParentId = "lalalalalalaal"
                pushD.transaction = resultsSta[sta].transactionInfo[tra].transDeposite

              }
              if (resultsSta[sta].transactionInfo[tra].transWithdraw) {
                //if withdraw and IS nada - add nada to cat
                pushD.transCat = "nada"
                pushD.catParent = "nada"
                pushD.catParentId = "lalalalalalaal"
                pushD.transaction = resultsSta[sta].transactionInfo[tra].transWithdraw
              }
            }
            transInfo.push(pushD);
          }
        }
        // console.log("transInfo: " + JSON.stringify(transInfo[0]));

        // group by catChild
        // group and SUM - group catNames and sum transaction
        // need to tune this up
        let resultGroupByParent = [];
        transInfo.reduce(function(res, value) {
          if (!res[value.catParent]) {
            res[value.catParent] = {
              catParent: value.catParent,
              catParentId: value.catParentId,
              transaction: 0
            };
            resultGroupByParent.push(res[value.catParent])
          }
          res[value.catParent].transaction += parseFloat(value.transaction)
          return res;
        }, {});
        // console.log("resultGroupByParent: " + JSON.stringify(resultGroupByParent[0]));
        // chartData - chartInfoParent
        // append data into chartInfoParent
        for (charD in resultGroupByParent) {
          // console.log("resultGroupByParent["+charD+"]: " + JSON.stringify(resultGroupByParent[charD]));
          let color = randomColor();
          chartInfoParent.chartData.dataLabel.push(resultGroupByParent[charD].catParent)
          chartInfoParent.chartData.dataValue.push(resultGroupByParent[charD].transaction.toFixed(2))
          chartInfoParent.chartData.dataParentId.push(resultGroupByParent[charD].catParentId)
          chartInfoParent.chartData.dataColor.push(color.hexString())
        }
        // Testing - resultGroupByParent
        // console.log("chartInfoParent data: " + JSON.stringify(chartInfoParent));


        // group by transCat
        // group all the child category and sum the transaction
        // need to tune this up
        let resultGroupByChild = [];
        transInfo.reduce(function(res, value) {
          if (!res[value.transCat]) {
            res[value.transCat] = {
              transCat: value.transCat,
              transCatId: value.transCatId,
              catParent: value.catParent,
              catParentId: value.catParentId,
              transaction: 0
            };
            resultGroupByChild.push(res[value.transCat])
          }
          res[value.transCat].transaction += parseFloat(value.transaction)
          return res;
        }, {});
        // console.log("resultGroupByChild: " + JSON.stringify(resultGroupByChild[0]));
        // chartData - chartInfoParent
        // append data into chartInfoParent
        for (charP in resultGroupByParent) {
          // console.log("resultGroupByChild["+charP+"]: " + JSON.stringify(resultGroupByParent[charP]));
          // prepare chart info
          let pushD = {
            chartId: charP,
            chartName: "overview: " + resultGroupByParent[charP].catParent,
            chartData: {
              dataParent: "",
              dataParentId: "",
              dataLabel: [],
              dataLabelId: [],
              dataValue: [],
              dataColor: []
            }
          }
          for (charC in resultGroupByChild) {
            if (resultGroupByChild[charC].catParentId == resultGroupByParent[charP].catParentId){
              let color = randomColor();
              pushD.chartData.dataLabel.push(resultGroupByChild[charC].transCat)
              pushD.chartData.dataLabelId.push(resultGroupByChild[charC].transCatId)
              pushD.chartData.dataParent = resultGroupByChild[charC].catParent
              pushD.chartData.dataParentId = resultGroupByChild[charC].catParentId
              pushD.chartData.dataValue.push(resultGroupByChild[charC].transaction.toFixed(2))
              pushD.chartData.dataColor.push(color.hexString())
            }
          }
          chartInfoChild.charts.push(pushD)
        }
        // Testing - resultGroupByChild
        for(w in chartInfoChild.charts){
          console.log("chartInfoChild data: "+w+" --"+ JSON.stringify(chartInfoChild.charts[w]));
        }


       // match with parent and child and create chart data for each Parent
       // group all the child category and sum the value


        res.render('investment/index', {
          pageInfo: pageInfo,
          dataCat: resultsCat,
          data: resultsSta,
          chartInfoParent: chartInfoParent,
          chartInfoChild: chartInfoChild
        });
      });
    });
  }
});



module.exports = router;
