/* Create Database 
 * Keep it minimal
 */
// SQL - statemetns 
// pool - blingBlaw - danzillaDB.pool
// postgresDefault - default postgres - danzillaDB.postgresDefault
const assets_database = require('../../../../../config/firstRun/assets_sql');
const fannypack_database = require('../../../../../config/firstRun/fannypack_sql');
const danzillaDB = require("../../../../modules/danzillaDB");
// Message
let pushD = {};
// UserAssets
// Create Database UserAssets - using -  danzillaDB.postgresDefault
const create_db_assets = function (callback, firstRunCheck) {
  danzillaDB.postgresDefault.query(assets_database.create_db, 
    function (err, Results) {
      if (!err && Results) { // If no errors and Results == Good
        pushD = { checked: "checked", results: Results }
        firstRunCheck.database.usersDB = pushD;
      } else if (err) { // if any errors
        pushD = { checked: "", results: err }
        firstRunCheck.database.usersDB = pushD;
      }
      callback(null, pushD);
  });
}
// FannyPacks
// Create Database fannyPacks - using -  danzillaDB.postgresDefault
const create_db_fannyPacks = function (callback, firstRunCheck) {
  danzillaDB.postgresDefault.query(fannypack_database.create_db, 
    function (err, Results) {
      if (!err && Results) { // If no errors and Results == Good
        pushD = { checked: "checked", results: Results }
        firstRunCheck.database.fannyDB = pushD;
      } else if (err) { // if any errors
        pushD = { checked: "", results: err }
        firstRunCheck.database.fannyDB = pushD;
      }
      callback(null, pushD);
  });
}
// Export Database Create
const createDatabase = {
  createAssetsDB: create_db_assets,
  createFannyPacksDB: create_db_fannyPacks
}
module.exports = createDatabase;
