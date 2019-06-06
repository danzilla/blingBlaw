/* Create Schema
 * Keep it minimal
 */
// SQL - statemetns 
// pool - blingBlaw - danzillaDB.pool
// postgresDefault - default postgres - danzillaDB.postgresDefault
const assets_database = require('../../../../../config/firstRun/assets_sql');
const fannypack_database = require('../../../../../config/firstRun/fannypack_sql');
const danzillaDB = require("../../../../modules/danzillaDB");
// Message
let pushD = { msg: "", code: "" }
// create_schema_users
// Create Schema Users - using -  danzillaDB.pool
const create_schema_users = function (callback, firstRunCheck) {
  danzillaDB.pool.query(assets_database.create_schema_users, 
    function (err, Results) {
      if (!err && Results) { // If no errors and Results == Good
        pushD.msg = Results; pushD.code = "checked";
        firstRunCheck.schema.usersSchema = pushD;
      } else if (err) { // if any errors
        pushD.msg = err; pushD.code = "";
        firstRunCheck.schema.usersSchema = pushD;
      }
      callback(null, pushD.msg);
  });
}
// create_schema_fannyPack
// Create Schema FannyPackz - using -  danzillaDB.pool
const create_schema_fannyPack = function (callback, firstRunCheck) {
  danzillaDB.pool.query(assets_database.create_schema_fannyPack,
    function (err, Results) {
      if (!err && Results) { // If no errors and Results == Good
        pushD.msg = Results; pushD.code = "checked";
        firstRunCheck.schema.fannypackSchema = pushD;
      } else if (err) { // if any errors
        pushD.msg = err; pushD.code = "";
        firstRunCheck.schema.fannypackSchema = pushD;
      }
      callback(null, pushD.msg);
    });
}
// Export Schema Create
const createSchema = {
  create_schema_users: create_schema_users,
  create_schema_fannyPack: create_schema_fannyPack
}
module.exports = createSchema;
