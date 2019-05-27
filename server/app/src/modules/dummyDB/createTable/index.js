/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
module.exports = {
  // POST - Create Table
  createTable: function(req, res, next) {
    // request DB conections
    const danzillaDB = require("../../danzillaDB");

    const DBState = {
      blingblaw: "",
      fannypack: "",

    }
  
  // Create DB - blingBlaw
  function blingBlaw() {
    // Query 
    let CreateBlingBlaw = "CREATE DATABASE blingblaw;";
    // Promise
    // Create blingBlaw DB
    return new Promise((resolve, reject) => {
        danzillaDB.pool.query(CreateBlingBlaw, function (err, blawResult) {
            // If no DB name blingblaw
            if (err) {
              // set default DB to postgres - danzillaDB.postgresDefault
              // Then - Create DB - blingblaw 
              danzillaDB.postgresDefault.query(CreateBlingBlaw, function (err1, blingResult) {
                if (err1) {  console.log("err1: " + err1); resolve(err1) }
                else { // if not errors - send good mesg
                    console.log("statementResults: " + blingResult);
                    resolve(blingResult)
                }
              })
            }
            else { // if not errors - send good mesg
                console.log("statementResults: " + blawResult);
                resolve(blawResult)
            }
        });
    })
  }
  // Create DB - fannyPack
  function fannyPack() {
    // Query Insert 
    let CreateFannyPack = "CREATE DATABASE fannypackz;";
    // Return query result to Promise 
    return new Promise((resolve, reject) => {
        danzillaDB.pool.query(CreateFannyPack, function (err, transactionResults) {
            if (err) { 
              console.log(err.code);
              console.log("2: " + err); resolve(err) 
            }
            else { // if not errors - push it to transGoodResults[]
                resolve(transactionResults)
            }
        });
    })
  }

  // set Async - payload
  async function initDatabase() {
    try {
        const blingBlawResult = await blingBlaw();
        const fannyPackResult = await fannyPack();
        
        console.log("blingBlawResult: " + blingBlawResult);
        console.log("fannyPackResult: " + fannyPackResult);
        
    } catch (err) {
        // End postgres-pool connection 
        danzillaDB.pool.end;
        let pageMesage = err;
        console.log("3: " + pageMesage);
        res.send({ pageMesage: pageMesage});
    }
  }
  // View all async actions - data
  initDatabase(); 
 
  }
}
