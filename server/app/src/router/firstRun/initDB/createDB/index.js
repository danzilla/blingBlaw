/* Create Database 
 * Keep it minimal
 */
// SQL - statemetns 
// pool - blingBlaw - danzillaDB.pool
// postgresDefault - default postgres - danzillaDB.postgresDefault
const assets_database = require('../../../../../config/firstRun/assets_sql');
const fannypack_database = require('../../../../../config/firstRun/fannypack_sql');
const danzillaDB = require("../../../../modules/danzillaDB");
// Labels
let msgGood = "Database initialized!";
let msgAlredy = "Database alredy exists"
let msgBad = "Ewww... Database not initialize";
const firstRunCheck_DB = {
  UserAssets: {
    message: "",
    checked: "",
    results: ""
  },
  FannyPacks: {
    message: "",
    checked: "",
    results: ""
  }
}
// UserAssets
// Create Database UserAssets - using -  danzillaDB.postgresDefault
const create_db_assets = function (callback) {
  danzillaDB.postgresDefault.query(assets_database.create_db, 
    function (err, Results) {
      // If no errors and Results == Good
      if (!err && Results) {
        firstRunCheck_DB.UserAssets.message = msgGood;
        firstRunCheck_DB.UserAssets.checked = "checked";
        firstRunCheck_DB.UserAssets.results = Results;
      } else if (err.code === "42P04") { // if any errors
        firstRunCheck_DB.UserAssets.message = msgAlredy + " - " + err.code;
        firstRunCheck_DB.UserAssets.checked = "checked";
        firstRunCheck_DB.UserAssets.results = err;
      } else if (err) { // if any errors
        firstRunCheck_DB.UserAssets.message = msgBad + " - " + err.code;
        firstRunCheck_DB.UserAssets.checked = "";
        firstRunCheck_DB.UserAssets.results = err;
      }
      callback(null, firstRunCheck_DB);
  });
}
// FannyPacks
// Create Database fannyPacks - using -  danzillaDB.postgresDefault
const create_db_fannyPacks = function (callback) {
  danzillaDB.postgresDefault.query(fannypack_database.create_db, 
    function (err, Results) {
      // If no errors and Results == Good
      if (!err && Results) {
        firstRunCheck_DB.FannyPacks.message = msgGood;
        firstRunCheck_DB.FannyPacks.checked = "checked";
        firstRunCheck_DB.FannyPacks.results = Results;
      } else if (err.code === "42P04") { // if any errors
        firstRunCheck_DB.FannyPacks.message = msgAlredy + " - " + err.code;
        firstRunCheck_DB.FannyPacks.checked = "checked";
        firstRunCheck_DB.FannyPacks.results = err;
      } else if (err) { // if any errors
        firstRunCheck_DB.FannyPacks.message = msgBad + " - " + err.code;
        firstRunCheck_DB.FannyPacks.checked = "";
        firstRunCheck_DB.FannyPacks.results = err;
      }
      callback(null, firstRunCheck_DB);
  });
}
// Export Database Create
const createDatabase = {
  createAssetsDB: create_db_assets,
  createFannyPacksDB: create_db_fannyPacks
}
module.exports = createDatabase;
