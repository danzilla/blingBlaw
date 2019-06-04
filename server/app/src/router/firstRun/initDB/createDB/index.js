/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */

// SQL - statemetns 
const assets_database = require('../../../../../config/firstRun/assets_sql');
const fannypack_database = require('../../../../../config/firstRun/fannypack_sql');
// pool - blingBlaw - danzillaDB.pool
// postgresDefault - default postgres - danzillaDB.postgresDefault
const danzillaDB = require("../../../../modules/danzillaDB");

// Messages
let pageMsg_DB_good = "Database initialized!";
let pageMsg_DB_bad = "Ewww... Database not initialize";
let pageMsg_DB_Nope = "3D000 - Database not initialize - trying with default settings";

// User_assets
// Create Database user_assets - danzillaDB.postgresDefault
const create_db_assets = function() {
  danzillaDB.postgresDefault.query(assets_database.create_db, function (err, Results) {
    if (err) {
      console.log(pageMsg_DB_bad + err.code + "\n" + err);
    } 
    else {
      console.log(pageMsg_DB_good + "\n" + Results);
    }
  });
}
// FannyPacks
// Create Database fannyPacks - danzillaDB.postgresDefault
const create_db_fannyPacks = function() {
  danzillaDB.postgresDefault.query(fannypack_database.create_db, function (err, Results) {
    if (err) {
      console.log(pageMsg_DB_bad + err.code + "\n" + err);
    } 
    else {
      console.log(pageMsg_DB_good + "\n" + Results);
    }
  });
}

const createDatabase = {
  createAssetsDB: create_db_assets,
  createFannyPacksDB: create_db_fannyPacks
}
module.exports = createDatabase;
