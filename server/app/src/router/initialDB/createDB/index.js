/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
const assets_database = require('../../../../config/initial_db_config/assets_sql');
const danzillaDB = require("../../../modules/danzillaDB");

module.exports = {
  // POST - Create Table
  createDB: function(req, res, next) {

    // Statement - Create Database user_assets 
    let createDatabase = assets_database.create_db;

    let pageMsg_noDB = "3D000 - Database not initialize - trying with default settings";
    let pageMsg_noTable = "3D000 - Table not initialize - trying with default settings";

    let pageMsg_DB_good = "Database initialized!"; 
    let pageMsg_DB_bad = "Ewww... Database not initialize"; 

    danzillaDB.pool.query(createDatabase, function (err, res) {

      
      if (err.code === "3D000") {
        // Log no_DB
        console.log(pageMsg_noDB);
        // trying with default_postgres_settings
        danzillaDB.postgresDefault.query(createDatabase, function (err, Results2) {
          if (err) {
            // Still error create DB
            console.log(pageMsg_DB_bad);
            console.log("2: Err: " + err);
          }
          else {
            console.log(pageMsg_DB_good);
            console.log("2: Result: " + JSON.stringify(Results2));
          }
        });
      } if (err){
        console.log("asd: " + err);
      }
      else {
        console.log(pageMsg_DB_good);
        console.log("1 Results: " + res);
      }
    });

  }
}
