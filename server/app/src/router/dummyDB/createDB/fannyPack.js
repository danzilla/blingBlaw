// Initial Database structure 
// Create DB -> Shecma -> and Table

// App Global config
const appConfig = require('../../../../config/app.config');
// DB connections 
const danzillaDB = require("../../../modules/danzillaDB");

// Create DB - fannyPack
function fannyPack() {
    // Query Insert 
    let CreateFannyPack = "CREATE DATABASE " + appConfig.appDB.dbName_fannyPack + ";";
    // Return query result to Promise 
    return new Promise((resolve, reject) => {
        danzillaDB.pool.query(CreateFannyPack, function (err, transactionResults) {
            if (err) { 
                console.log("2: " + err.code + err);
                resolve(err) 
            }
            else { 
                resolve(transactionResults) 
            }
        });
    })
}

module.exports = fannyPack;
