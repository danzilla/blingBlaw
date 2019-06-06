/* Create Tables
 * Keep it minimal
 */
// SQL - Tables
// pool - blingBlaw - danzillaDB.pool
// postgresDefault - default postgres - danzillaDB.postgresDefault
const assets_database = require('../../../../../config/firstRun/assets_sql');
const fannypack_database = require('../../../../../config/firstRun/fannypack_sql');
const danzillaDB = require("../../../../modules/danzillaDB");
// Message
let pushD = {};

let tableInfo = [
  {name: "", create: ""}
]
let tablesList = [
  assets_database.create_table_userAuth,
  assets_database.create_table_userDetails,
  assets_database.create_table_userRecords,
  assets_database.create_table_userGroup,
  assets_database.create_table_fannypacks_records,
  assets_database.create_table_fannypacks_fannypacks
]

for ( let table of tablesList){
  console.log("lol");
  console.log(table);
}

// create_table_userAuth
// Create Table Users Auth - using -  danzillaDB.pool
const create_table_userAuth = function (callback, firstRunCheck) {
  danzillaDB.pool.query(assets_database.create_table_userAuth, 
    function (err, Results) {
      if (!err && Results) { // If no errors and Results == Good
        pushD = { checked: "checked", results: Results }
        firstRunCheck.table.userAuth = pushD;
      } else if (err) { // if any errors
        pushD = { checked: "", results: err }
        firstRunCheck.table.userAuth = pushD;
      }
      callback(null, pushD.msg);
  });
}




// Export Tables Create
const createTable = {
  create_table_userAuth: create_table_userAuth
}
module.exports = createTable;



