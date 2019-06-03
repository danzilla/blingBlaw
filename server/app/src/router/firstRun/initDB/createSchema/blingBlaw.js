// Initial Database structure 
// Create DB -> Shecma -> and Table

// App Global config
const appConfig = require('../../../../../config/app.config');
// DB connections 
const danzillaDB = require("../../../../modules/danzillaDB");

// Create DB - blingBlaw
function blingBlaw() {
    // Query Insert 
    let CreateblingBlaw = "CREATE DATABASE 123" + appConfig.appDB.dbName_assets + ";";
    // Return query result to Promise 
    return new Promise((resolve, reject) => {
        danzillaDB.pool.query(CreateblingBlaw, function (err, transactionResults) {
            if (err) { 
                console.log("1: " + err.code + err);
                resolve(err) 
            }
            else { 
                resolve(transactionResults) 
            }
        });
    })
}

module.exports = blingBlaw;
