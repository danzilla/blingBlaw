/* Create Database 
 * Keep it minimal
 */
// SQL - statemetns 
// pool - blingBlaw - danzillaDB.pool
const assets_database = require('../../../../modules/statements/firstRun/assets_sql');
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
      } else if (err.code == "42P04") { // if any errors
        pushD = { checked: "checked", results: "Database alredy exists" }
        firstRunCheck.database.usersDB = pushD;
      } else if (err) { // if any errors
        pushD = { checked: "", results: err }
        firstRunCheck.database.usersDB = pushD;
      }
      callback(null, pushD);
  });
}
// Export Database Create
const createDatabase = {
  createAssetsDB: create_db_assets
}
module.exports = createDatabase;