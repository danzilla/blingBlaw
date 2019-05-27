// Initial Database structure 
// Create DB -> Shecma -> and Table

// App Global config
const appConfig = require('../../../../config/app.config');
// DB connections 
const danzillaDB = require("../../../modules/danzillaDB");

const createBlingBlaw = {
    dbName: "CREATE DATABASE " + appConfig.appDB.dbName_assets + ";",
    dbShema_users: appConfig.appDB.dbName_assets + ".users",
    dbShema_fannypack: appConfig.appDB.dbName_assets + ".fannypack"
};

// IF - createBlingBlaw - Failed - try with default postgres
// Create DB - blingBlaw
function createBlingBlaw_from_Default() {
    // Promise
    return new Promise((resolve, reject) => {
        // set default DB to postgres - danzillaDB.postgresDefault
        // Then - Create DB - blingblaw
        danzillaDB.postgresDefault.query(createBlingBlaw.dbName, function (err, result) {
            if (err) { console.log("err: " + err); reject("err: " + err) }
            else { console.log(JSON.stringify(result)); resolve("result: " + result) }
        });
    })
}

// Create DB - fannyPack
function blingBlaw() {
    // Query Insert 
    let CreateFannyPack = "CREATE DATABASE " + appConfig.appDB.dbName_fannyPack + ";";
    // Return query result to Promise 
    return new Promise((resolve, reject) => {
        danzillaDB.pool.query(CreateFannyPack, function (err, transactionResults) {
            if (err) {
                console.log("1: " + err.code + err);
                resolve(err)
                const fannyPackResult = createBlingBlaw_from_Default();
                console.log("fannyPackResult: " + fannyPackResult);
            }
            else {
                resolve(transactionResults)
            }
        });
    })
}

module.exports = blingBlaw;
