/* Create Tables
 * Keep it minimal
 */
// SQL - Tables
// pool - blingBlaw - danzillaDB.pool
// postgresDefault - default postgres - danzillaDB.postgresDefault
const assets_database = require('../../../../modules/statements/firstRun/assets_sql');
const fannypack_database = require('../../../../modules/statements/firstRun/fannypack_sql');
const danzillaDB = require("../../../../modules/danzillaDB");
// Message
let pushD = {};
// Users_Assets_Database Tables
// TableList
let tablesList = [
  { name: "firstRunCheck.table.userGroup", create: "assets_database.create_table_userGroup" },
  { name: "firstRunCheck.table.userAuth", create: "assets_database.create_table_userAuth" },
  { name: "firstRunCheck.table.userDetails", create: "assets_database.create_table_userDetails" },
  { name: "firstRunCheck.table.userRecord", create: "assets_database.create_table_userRecords" },
  { name: "firstRunCheck.table.fannyPack", create: "assets_database.create_table_fannypacks_records" },
  { name: "firstRunCheck.table.fannyRecord", create: "assets_database.create_table_fannypacks_fannypacks" }
]
// 1
// create_table_userGroup
// Create Table User Group - using -  danzillaDB.pool
const create_table_userGroup = function (callback, firstRunCheck) {
  danzillaDB.pool.query(assets_database.create_table_userGroup,
    function (err, Results) {
      if (!err && Results) { // If no errors and Results == Good
        pushD = { checked: "checked", results: Results }
        firstRunCheck.table.userGroup = pushD;
      } else if (err) { // if any errors
        pushD = { checked: "", results: err }
        firstRunCheck.table.userGroup = pushD;
      }
      callback(null, pushD);
    });
}
// 2
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
      callback(null, pushD);
    });
}
// 3
// create_table_userDetails
// Create Table user Details - using -  danzillaDB.pool
const create_table_userDetails = function (callback, firstRunCheck) {
  danzillaDB.pool.query(assets_database.create_table_userDetails,
    function (err, Results) {
      if (!err && Results) { // If no errors and Results == Good
        pushD = { checked: "checked", results: Results }
        firstRunCheck.table.userDetails = pushD;
      } else if (err) { // if any errors
        pushD = { checked: "", results: err }
        firstRunCheck.table.userDetails = pushD;
      }
      callback(null, pushD);
    });
}
// 4
// create_table_userRecords
// Create Table user Records - using -  danzillaDB.pool
const create_table_userRecords = function (callback, firstRunCheck) {
  danzillaDB.pool.query(assets_database.create_table_userRecords,
    function (err, Results) {
      if (!err && Results) { // If no errors and Results == Good
        pushD = { checked: "checked", results: Results }
        firstRunCheck.table.userRecord = pushD;
      } else if (err) { // if any errors
        pushD = { checked: "", results: err }
        firstRunCheck.table.userRecord = pushD;
      }
      callback(null, pushD);
    });
}
// 5
// create_table_fannypacks_fannypacks
// Create Table user fannyPack - using -  danzillaDB.pool
const create_table_fannypacks_fannypacks = function (callback, firstRunCheck) {
  danzillaDB.pool.query(assets_database.create_table_fannypacks_fannypacks,
    function (err, Results) {
      if (!err && Results) { // If no errors and Results == Good
        pushD = { checked: "checked", results: Results }
        firstRunCheck.table.fannyPack = pushD;
      } else if (err) { // if any errors
        pushD = { checked: "", results: err }
        firstRunCheck.table.fannyPack = pushD;
      }
      callback(null, pushD);
    });
}
// 6
// create_table_fannypacks_records
// Create Table user Records - using -  danzillaDB.pool
const create_table_fannypacks_records = function (callback, firstRunCheck) {
  danzillaDB.pool.query(assets_database.create_table_fannypacks_records,
    function (err, Results) {
      if (!err && Results) { // If no errors and Results == Good
        pushD = { checked: "checked", results: Results }
        firstRunCheck.table.fannyRecord = pushD;
      } else if (err) { // if any errors
        pushD = { checked: "", results: err }
        firstRunCheck.table.fannyRecord = pushD;
      }
      callback(null, pushD);
    });
}
// Export Tables Create
const createTable = {
  create_table_userGroup: create_table_userGroup,
  create_table_userAuth: create_table_userAuth,
  create_table_userDetails: create_table_userDetails,
  create_table_userRecords: create_table_userRecords,
  create_table_fannypacks_fannypacks: create_table_fannypacks_fannypacks,
  create_table_fannypacks_records: create_table_fannypacks_records
}
module.exports = createTable;



